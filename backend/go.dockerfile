FROM golang:1.16-alpine

WORKDIR /app

COPY . .

# Download and install dependencies
RUN go get -d -v ./...

# Build the Go application
RUN go build -o api .

EXPOSE 8000

CMD ["./api"]