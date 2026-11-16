# Sum Even Numbers

A Go program that calculates the sum of even numbers in a slice, with both sequential and concurrent implementations.

## Functions

- `sumEven(numbers []int) int` - Sequential sum of even numbers
- `sumEvenConcurrent(numbers []int, workerCount int) (int, error)` - Concurrent sum using worker goroutines

## Quick Start

### Native (requires Go 1.23+)

```bash
# Run program
make run

# Run tests with race detector
make test

# Run benchmarks
make bench

# Build binary
make build
```

### Docker / Podman

```bash
# Build and run app
make docker-run

# Build and run tests (with race detector)
make docker-test

# Build image only
make docker-build

# Clean up images
make clean
```

## Usage

```bash
go run main.go sum.go
```

Generates 10,000,000 numbers and sums the even ones using 4 workers.

## Example Output

```
$ go run main.go sum.go
25000005000000
```

## Benchmarks

| Function | Operations/sec | Time/op | Allocs/op |
|----------|----------------|---------|-----------|
| `sumEven` | ~286,383 | ~4,167 ns | 0 B |
| `sumEvenConcurrent` (4 workers) | ~57,406 | ~20,165 ns | 449 B |

The concurrent version has overhead from goroutine creation and channel communication, making it slower for small datasets. It becomes beneficial with larger datasets or more CPU-intensive operations.

## Project Structure

```
.
├── main.go           # Entry point, generates 10M numbers
├── sum.go            # sumEven & sumEvenConcurrent implementations
├── sum_test.go       # Tests + benchmarks (race detector clean)
├── Dockerfile        # 3-stage: base, test, build, run
├── Makefile          # Native + Docker targets
└── go.mod            # Go module (1.23+)
```

## Makefile Targets

### Native
| Target | Description |
|--------|-------------|
| `make run` | Run program natively |
| `make test` | Run tests with `-race` |
| `make test-short` | Run tests without race detector |
| `make bench` | Run benchmarks |
| `make build` | Build binary to `bin/app` |

### Docker
| Target | Description |
|--------|-------------|
| `make docker-run` | Build and run app in container |
| `make docker-test` | Build and run tests in container (with race) |
| `make docker-build` | Build Docker image only |
| `make docker-build-run` | Build and run (one command) |
| `make docker-build-test` | Build and test (one command) |

### Cleanup
| Target | Description |
|--------|-------------|
| `make clean` | Remove `bin/` and Docker images |

## Dockerfile Stages

```dockerfile
# Base stage - shared dependencies
FROM golang:1.27.3-alpine AS base

# Test stage - includes gcc for race detector
FROM base AS test
CMD ["go", "test", "-v", "-race", "./..."]

# Build stage - compiles static binary
FROM base AS build
RUN CGO_ENABLED=0 GOOS=linux go build -o app .

# Run stage - minimal alpine runtime
FROM alpine:latest AS run
COPY --from=build /app/app .
CMD ["./app"]
```

Build specific target:
```bash
podman build --target run -t sum-even .
podman build --target test -t sum-even-test .
```

## Race Detector

All tests pass with `-race` flag (no data races):

```bash
# Native
make test

# Docker
make docker-test
```

## Requirements

- Go 1.23+ (native)
- Podman or Docker (containerized)