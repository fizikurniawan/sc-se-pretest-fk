package main

func generateNumbers(size int) []int {
	numbers := make([]int, size)
	for i := range numbers {
		numbers[i] = i + 1
	}

	return numbers
}

func main() {
	numbers := generateNumbers(10_000_000)
	workerCount := 4

	sum, err := sumEvenConcurrent(numbers, workerCount)

	if err != nil {
		panic(err)
	}

	println(sum)

}
