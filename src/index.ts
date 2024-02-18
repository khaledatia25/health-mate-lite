import express from "express";
import userRouter from "./routers/user.router";
import "./db/mongoose";
import startApolloServer from "./apolloServer";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);

startApolloServer(app).catch((err) => {
  console.error(err);
});
