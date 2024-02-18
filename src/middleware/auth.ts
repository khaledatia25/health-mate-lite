import jwt from "jsonwebtoken";
import User from "../model/User";
import { RequestWithUser } from "../controller/user.controller";
import { NextFunction, Response } from "express";

export const getToken = (token: string) => {
  return token.replace("Bearer ", "");
};

export const getUser = async (token: string) => {
  token = getToken(token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded || typeof decoded !== "object") {
    throw new Error();
  }
  if (!("_id" in decoded)) {
    throw new Error();
  }
  return await User.findOne({
    _id: decoded._id,
    "tokens.token": token,
  });
};

export default async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUser(req.header("Authorization"));

    if (!user) {
      throw new Error();
    }
    req.token = getToken(req.header("Authorization"));
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};
