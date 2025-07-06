require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const port = process.env.PORT;
const envCors = process.env.CORS;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(logger("dev"));
app.use(
  cors({
    origin: JSON.parse(envCors),
    credentials: true,
  })
);

const routes = [
  { path: "/api/rates", router: require("./routes/ratesRoutes") },
  { path: "/api/currencies", router: require("./routes/currenciesRoutes") },
];

routes.forEach(({ path, router }) => {
  app.use(path, router);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
