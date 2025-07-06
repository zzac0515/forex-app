# Forex Coding Challenge – Zac

This was a coding challenge from another company that I've interviewed for, after enhancing it a little i decided to include this in my portfolio.

It is a simple full-stack application that consists of:

Frontend: Next.js, TypeScript, Tailwind CSS, Material UI, Framer Motion

Backend: Express.js, MySQL2

Database: MySQL (with init script)

Dev Tools: Docker, Docker Compose

Testing: Jest

---

## Short Description:

This is a simple app that fetches forex rates based on dates and base currencies.

I implemented Lazy Loading, so on initial load i will only display 12 data, scrolling down pulls the remaining data.

I have grid view and table view for my data, get more data by:

- Grid view: scrolling down
- Table view: clicking next arrow on the pagination section

This app is responsive, it caters for both mobile and desktop view.

Note: My init script has 20 currencies and data will only be shown for Today and Yesterday.

---

### Prerequisites - Before we start, there's a few things needed to run this smoothly

- Docker Desktop installed and running
- Git installed

---

### Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/zzac0515/forex-app.git
cd forex-app
```

### 2. Running the app with Docker

```bash
docker compose down -v  # Optional: cleans volumes (resets DB)
docker compose up --build
```

---

### URLs:

Frontend: http://localhost:3000
Backend: http://localhost:3001

### Commands:

### Start App:

```bash
docker compose down -v
docker compose up --build
```

### Stop App:

```bash
docker compose down
```

### View Logs:

```bash
docker compose logs -f
```
