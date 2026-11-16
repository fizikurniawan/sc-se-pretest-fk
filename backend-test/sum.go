package main

import (
	"fmt"
	"sync"
)

func sumEven(numbers []int) int {
	sum := 0

	if len(numbers) == 0 {
		return 0
	}

	for _, number := range numbers {
		if number%2 == 0 {
			sum += number
		}
	}

	return sum

}

func sumEvenConcurrent(numbers []int, workerCount int) (int, error) {
	if workerCount < 1 {
		return 0, fmt.Errorf("workerCount must be greater than zero")
	}

	// create channel to store sub total per worker
	results := make(chan int, workerCount)

	var wg sync.WaitGroup

	// find chunkSize to allocate each worker
	chunkSize := (len(numbers) + workerCount - 1) / workerCount

	for worker := range workerCount {
		start := worker * chunkSize
		end := min(start+chunkSize, len(numbers))

		if start >= len(numbers) {
			break
		}

		wg.Add(1)
		go func(chunk []int) {
			defer wg.Done()

			partialSum := sumEven(chunk)
			results <- partialSum
		}(numbers[start:end])
	}

	wg.Wait()
	close(results)

	total := 0

	for partialSum := range results {
		total += partialSum
	}

	return total, nil
}
