import express from "express";
import acronym_routes from "./routes/acronyms.js";
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/acronym", acronym_routes);

app.get("/", (req, res) => res.send("Welcome to the Acronyms API!"));

app.all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});