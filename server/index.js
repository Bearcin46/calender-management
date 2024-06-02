import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const server = express();
const server_port = process.env.SERVER_PORT;

server.use(cors());
server.use(express.json());

const db_connection = process.env.MONGODB_URL;
mongoose
  .connect(db_connection)
  .then(() => {
    console.log("Connected to mongodb");

    //Routes
    server.get("/", (req, res) => {
      res.send("Hello from express");
    });

    server.listen(server_port, () => {
      console.log(`server is running on port ${server_port}`);
    });
  })
  .catch((err) => {
    console.log("There is error in mongodb connection", err);
  });
