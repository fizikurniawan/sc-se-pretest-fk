# Base stage
FROM golang:1.27.3-alpine AS base
WORKDIR /app
COPY go.mod ./
RUN go mod download

# Test stage
FROM base AS test
COPY . .
RUN apk add --no-cache gcc musl-dev
CMD ["go", "test", "-v", "-race", "./..."]

# Build stage
FROM base AS build
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o app .

# Run stage
FROM alpine:latest AS run
WORKDIR /app
COPY --from=build /app/app .
CMD ["./app"]