# ask-me-anything

Ask Me Anything is a real-time discussion platform where users can start online conversations with a specific theme.

This repo is the RESTful API written in Go.

## Installation

> [!IMPORTANT]
> To setup and run the project, ensure you have both `Go` and `Docker` installed.
>
> Remember to change the provided example variables to actual values ​​in the `.env` file.

### Clone the repository

```sh
git clone git@github.com:bonizario/ask-me-anything-server.git
cd ask-me-anything-server
```

### Set environment variables

```sh
cp .env.example .env
```

### Create and start the containers

```sh
docker compose up -d
```

### Run database migrations

```sh
go generate ./...
```

### Start the project

```sh
go run cmd/ama/main.go
```
