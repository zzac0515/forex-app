# Forex Coding Challenge – Zac

This is a coding challenge from another company, it is a full-stack application that consists of:

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

Note: My init script has 20 currencies and data will only be shown for Today and Yesterday. 

Submodules:
- FE https://github.com/zzac0515/ureg-fe
- BE https://github.com/zzac0515/ureg-be

---

### Prerequisites - Before we start, there's a few things needed to run this smoothly

- Docker Desktop installed and running
- Git installed

---

### Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/zzac0515/ureg-coding-challenge-zac.git
cd ureg-coding-challenge-zac
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
