import User, { type User as UserType } from "../model/User";
import { Request, Response } from "express";

export async function signup(req: Request, res: Response) {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
}

export async function login(req: Request, res: Response) {
  try {
    if (!req.body.email || !req.body.password) {
      throw new Error("Email and password are required");
    }
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
}
export type RequestWithUser = Request & { user: UserType; token: string };

export async function logout(req: RequestWithUser, res: Response) {
  try {
    if (!req?.user || !req?.token) {
      throw new Error("You are not logged in");
    }
    if (!("_id" in req.user)) {
      throw new Error("You are not logged in");
    }
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
}

export async function logoutAll(req: RequestWithUser, res: Response) {
  try {
    if (!req?.user) {
      throw new Error("You are not logged in");
    }
    if (!("_id" in req.user)) {
      throw new Error("You are not logged in");
    }
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
}

export async function deleteMe(req: RequestWithUser, res: Response) {
  try {
    if (!req?.user) {
      throw new Error("You are not logged in");
    }
    if (!("_id" in req.user)) {
      throw new Error("You are not logged in");
    }
    await User.deleteOne({ _id: req.user._id });
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
}

export async function getUser(_root, {}, { user }) {
  if (!user) {
    throw new Error("You are not logged in");
  }
  if (!("_id" in user)) {
    throw new Error("You are not logged in");
  }
  return User.findById(user._id);
}
