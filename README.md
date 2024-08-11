# ask-me-anything

Ask Me Anything is a real-time platform where users can create rooms on specific topics and engage in relevant questions for the community.

This repository contains the server and client applications, built using Go and React, respectively.

## Installation

> [!IMPORTANT]
> To setup and run the **server**, ensure you have both `Go (1.22.5)` and `Docker (27.1.1)` installed.
>
> To setup and run the **client**, ensure you have `Node.js (20.16.0)` installed.
>
> Remember to change the provided example variables to actual values ​​in the `.env` file.

### Clone the repository

```sh
git clone git@github.com:bonizario/ask-me-anything.git
cd ask-me-anything
```

### Setup server

```sh
cd server
```

#### Create .env file

```sh
cp .env.example .env
```

#### Create and start the containers

```sh
docker compose up -d
```

#### Run database migrations

```sh
go generate ./...
```

#### Start the server

```sh
go run cmd/ama/main.go
```

### Setup client

```sh
cd client
```

#### Install PNPM package manager

```sh
npm install -g pnpm
```

#### Install dependencies

```sh
pnpm install
```

#### Start the client

```sh
pnpm dev
```
