package main

import (
	"fmt"
	"testing"
)

func TestSumEven(t *testing.T) {
	tests := []struct {
		name     string
		input    []int
		expected int
	}{
		{
			name:     "empty slice",
			input:    []int{},
			expected: 0,
		},
		{
			name:     "no even numbers",
			input:    []int{1, 3, 5, 7},
			expected: 0,
		},
		{
			name:     "all even numbers",
			input:    []int{2, 4, 6, 8},
			expected: 20,
		},
		{
			name:     "mixed numbers",
			input:    []int{1, 2, 3, 4, 5, 6},
			expected: 12,
		},
		{
			name:     "single even number",
			input:    []int{2},
			expected: 2,
		},
		{
			name:     "single odd number",
			input:    []int{1},
			expected: 0,
		},
		{
			name:     "negative even numbers",
			input:    []int{-4, -2, 0, 2, 4},
			expected: 0,
		},
		{
			name:     "large numbers",
			input:    []int{1000000, 1000001, 1000002},
			expected: 2000002,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := sumEven(tt.input)
			if result != tt.expected {
				t.Errorf("sumEven(%v) = %d; want %d", tt.input, result, tt.expected)
			}
		})
	}
}

func TestSumEvenConcurrent(t *testing.T) {
	tests := []struct {
		name        string
		input       []int
		workerCount int
		wantSum     int
		wantErr     bool
	}{
		{
			name:        "empty slice with workers",
			input:       []int{},
			workerCount: 4,
			wantSum:     0,
			wantErr:     false,
		},
		{
			name:        "no even numbers",
			input:       []int{1, 3, 5, 7},
			workerCount: 2,
			wantSum:     0,
			wantErr:     false,
		},
		{
			name:        "all even numbers",
			input:       []int{2, 4, 6, 8},
			workerCount: 2,
			wantSum:     20,
			wantErr:     false,
		},
		{
			name:        "mixed numbers",
			input:       []int{1, 2, 3, 4, 5, 6},
			workerCount: 3,
			wantSum:     12,
			wantErr:     false,
		},
		{
			name:        "single worker",
			input:       []int{1, 2, 3, 4, 5, 6},
			workerCount: 1,
			wantSum:     12,
			wantErr:     false,
		},
		{
			name:        "more workers than elements",
			input:       []int{2, 4},
			workerCount: 10,
			wantSum:     6,
			wantErr:     false,
		},
		{
			name:        "workerCount zero returns error",
			input:       []int{1, 2, 3},
			workerCount: 0,
			wantSum:     0,
			wantErr:     true,
		},
		{
			name:        "negative workerCount returns error",
			input:       []int{1, 2, 3},
			workerCount: -1,
			wantSum:     0,
			wantErr:     true,
		},
		{
			name:        "large dataset",
			input:       generateNumbers(10000),
			workerCount: 8,
			wantSum:     sumEven(generateNumbers(10000)),
			wantErr:     false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, err := sumEvenConcurrent(tt.input, tt.workerCount)

			if tt.wantErr {
				if err == nil {
					t.Errorf("sumEvenConcurrent(%v, %d) expected error but got nil", tt.input, tt.workerCount)
				}
				return
			}

			if err != nil {
				t.Errorf("sumEvenConcurrent(%v, %d) unexpected error: %v", tt.input, tt.workerCount, err)
				return
			}

			if result != tt.wantSum {
				t.Errorf("sumEvenConcurrent(%v, %d) = %d; want %d", tt.input, tt.workerCount, result, tt.wantSum)
			}
		})
	}
}

func TestSumEvenConcurrentMatchesSequential(t *testing.T) {
	input := generateNumbers(100000)

	for _, workers := range []int{1, 2, 4, 8, 16, 32} {
		t.Run(fmt.Sprintf("workers=%d", workers), func(t *testing.T) {
			sequential := sumEven(input)
			concurrent, err := sumEvenConcurrent(input, workers)
			if err != nil {
				t.Fatalf("sumEvenConcurrent error: %v", err)
			}
			if sequential != concurrent {
				t.Errorf("mismatch: sequential=%d concurrent=%d", sequential, concurrent)
			}
		})
	}
}

func BenchmarkSumEven(b *testing.B) {
	input := generateNumbers(10000)
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		sumEven(input)
	}
}

func BenchmarkSumEvenConcurrent(b *testing.B) {
	input := generateNumbers(10000)
	workerCount := 4
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		sumEvenConcurrent(input, workerCount)
	}
}