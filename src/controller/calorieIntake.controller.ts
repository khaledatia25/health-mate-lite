import CalorieIntake from "../model/CalorieIntake";
import { unauthorizedError, badRequestError, notFoundError } from "./errors";

export const createCalorieIntake = async (
  _root,
  { date, calories, additionalDetails },
  { user }
) => {
  if (!user) {
    throw unauthorizedError("Missing authentication");
  }
  console.log(date);
  try {
    const calorieIntake = new CalorieIntake({
      userId: user._id,
      date: new Date(date),
      calories,
      additionalDetails,
    });
    await calorieIntake.save();
    return calorieIntake;
  } catch (e) {
    throw badRequestError(e.message);
  }
};

export const updateCalorieIntake = async (
  _root,
  { id, date, calories, additionalDetails },
  { user }
) => {
  if (!user) {
    throw unauthorizedError("Missing authentication");
  }
  try {
    const calorieIntake = await CalorieIntake.findOne({
      _id: id,
      userId: user._id,
    });
    if (!calorieIntake) {
      throw notFoundError("Calorie intake not found");
    }
    if (date) calorieIntake.date = new Date(date);
    if (calories) calorieIntake.calories = calories;
    if (additionalDetails) calorieIntake.additionalDetails = additionalDetails;
    await calorieIntake.save();
    return calorieIntake;
  } catch (e) {
    throw badRequestError(e.message);
  }
};

export const deleteCalorieIntake = async (_root, { id }, { user }) => {
  if (!user) {
    throw unauthorizedError("Missing authentication");
  }
  try {
    const calorieIntake = await CalorieIntake.findOne({
      _id: id,
      userId: user._id,
    });
    if (!calorieIntake) {
      throw notFoundError("Calorie intake not found");
    }
    await CalorieIntake.deleteOne({ _id: id });
    return calorieIntake;
  } catch (e) {
    throw badRequestError(e.message);
  }
};

export const calorieIntake = async (_root, { id }, { user }) => {
  if (!user) {
    throw unauthorizedError("Missing authentication");
  }
  try {
    const calorieIntake = await CalorieIntake.findOne({
      _id: id,
      userId: user._id,
    });
    if (!calorieIntake) {
      throw notFoundError("Calorie intake not found");
    }
    return calorieIntake;
  } catch (e) {
    throw badRequestError(e.message);
  }
};

export const calorieIntakes = async (_root, _args, { user }) => {
  if (!user) {
    throw unauthorizedError("Missing authentication");
  }
  try {
    const calorieIntakes = await CalorieIntake.find({ userId: user._id });
    return calorieIntakes;
  } catch (e) {
    throw badRequestError(e.message);
  }
};
