.PHONY: run test build clean docker-run docker-test docker-build docker-clean

# Native commands
run:
	go run main.go sum.go

test:
	go test -v -race ./...

test-short:
	go test ./...

bench:
	go test -bench=. -benchmem ./...

build:
	CGO_ENABLED=0 go build -o bin/app .

# Docker commands
DOCKER_IMAGE := sum-even

docker-build:
	podman build --target run -t $(DOCKER_IMAGE) .

docker-run: docker-build
	podman run --rm $(DOCKER_IMAGE)

docker-test:
	podman build --target test -t $(DOCKER_IMAGE)-test .
	podman run --rm $(DOCKER_IMAGE)-test

docker-build-run:
	podman build --target run -t $(DOCKER_IMAGE) . && podman run --rm $(DOCKER_IMAGE)

docker-build-test:
	podman build --target test -t $(DOCKER_IMAGE)-test . && podman run --rm $(DOCKER_IMAGE)-test

# Cleanup
clean:
	rm -rf bin/
	podman rmi -f $(DOCKER_IMAGE) $(DOCKER_IMAGE)-test 2>/dev/null || true

# Help
help:
	@echo "Native targets:"
	@echo "  make run         - Run program natively"
	@echo "  make test        - Run tests with race detector"
	@echo "  make test-short  - Run tests without race detector"
	@echo "  make bench       - Run benchmarks"
	@echo "  make build       - Build binary to bin/app"
	@echo ""
	@echo "Docker targets:"
	@echo "  make docker-run       - Build and run app in container"
	@echo "  make docker-test      - Build and run tests in container (with race)"
	@echo "  make docker-build     - Build Docker image only"
	@echo "  make docker-build-run - Build and run (one command)"
	@echo "  make docker-build-test- Build and test (one command)"
	@echo ""
	@echo "Cleanup:"
	@echo "  make clean        - Remove bin/ and Docker images"