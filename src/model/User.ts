import {
  InferSchemaType,
  Schema,
  HydratedDocument,
  Model,
  model,
} from "mongoose";
import { isEmail } from "validator";
import Goal from "./Goal";
import CalorienlIntake from "./CalorieIntake";
import FitnessActivity from "./FitnessActivity";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface IUser {
  username: string;
  password: string;
  email: string;
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  tokens: { token: string }[];
}

export interface IUserMethods {
  toJSON(): IUser;
  generateAuthToken(): Promise<string>;
}

export interface UserModel extends Model<IUser, {}, IUserMethods> {
  findByCredentials(
    email: string,
    password: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
}

const schema = new Schema<IUser, UserModel, IUserMethods>({
  username: { type: String, required: true, trim: true, unique: true },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
    validate(value: string) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain 'password'");
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value: string) {
      if (!isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
  gender: {
    type: String,
    trim: true,
    enum: ["Male", "Female", "Other"],
  },
  height: {
    type: Number,
    default: 0,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Height must be a positive number");
      }
    },
  },
  weight: {
    type: Number,
    default: 0,
    validate(value: number) {
      if (value < 0) {
        throw new Error("Weight must be a positive number");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

schema.virtual("goals", {
  ref: "Goal",
  localField: "_id",
  foreignField: "user",
});

schema.method("toJSON", function toJSON() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
});

schema.method(
  "generateAuthToken",
  async function generateAuthToken(): Promise<string> {
    const user = this;
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET!
    );
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  }
);

schema.static(
  "findByCredentials",
  async function findByCredentials(
    email: string,
    password: string
  ): Promise<User> {
    const user: User | null = await (async () => {
      if (!isEmail(email)) {
        const user = await User.findOne({ username: email });
        if (!user) {
          throw new Error("Unable to login");
        }

        return user;
      } else {
        return await User.findOne({ email });
      }
    })();
    if (!user) {
      throw new Error("Unable to login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Unable to login");
    }
    return user;
  }
);

schema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

schema.pre("deleteOne", async function (next) {
  const user = this;
  if (!("_id" in user)) return next();
  await Goal.deleteMany({ userId: user._id });
  await CalorienlIntake.deleteMany({ userId: user._id });
  await FitnessActivity.deleteMany({ userId: user._id });
  next();
});

schema.set("toObject", { virtuals: true });

const User = model<IUser, UserModel>("User", schema);

export type User = HydratedDocument<IUser, IUserMethods>;
export default User;
