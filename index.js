import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import notesRouter from "./routes/notesRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful!!!"));

// Body parser
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the notes application 😀😀📝");
});

app.use("/users", userRouter);
app.use("/notes", notesRouter);

app.listen(PORT, () =>
  console.log(`The server is connected to port: ${PORT} ☕☕☕`)
);
