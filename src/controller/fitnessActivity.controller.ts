import FitnessActivity from "../model/FitnessActivity";
import { unauthorizedError, badRequestError } from "./errors";

export const createFitnessActivity = async (
  _root,
  { steps, date, additionalDetails },
  { user }
) => {
  if (!user) {
    throw unauthorizedError("Missing authentication");
  }
  try {
    const fitnessActivity = new FitnessActivity({
      userId: user._id,
      steps,
      date: new Date(date),
      additionalDetails,
    });
    await fitnessActivity.save();
    return fitnessActivity;
  } catch (e) {
    throw badRequestError(e.message);
  }
};

export const updateFitnessActivity = async (
  _root,
  { id, steps, date, additionalDetails },
  { user }
) => {
  if (!user) {
    throw unauthorizedError("Missing authentication");
  }
  const fitnessActivity = await FitnessActivity.findById(id);
  if (!fitnessActivity) {
    throw badRequestError("No fitness activity found with id " + id);
  }
  if (fitnessActivity.userId !== user._id) {
    throw unauthorizedError("Not authorized to update this fitness activity");
  }
  if (steps) fitnessActivity.steps = steps;
  if (date) fitnessActivity.date = new Date(date);
  if (additionalDetails) fitnessActivity.additionalDetails = additionalDetails;
  await fitnessActivity.save();
  return fitnessActivity;
};

export const deleteFitnessActivity = async (_root, { id }, { user }) => {
  if (!user) {
    throw unauthorizedError("Missing authentication");
  }
  const fitnessActivity = await FitnessActivity.findById(id);
  if (!fitnessActivity) {
    throw badRequestError("No fitness activity found with id " + id);
  }
  if (fitnessActivity.userId !== user._id) {
    throw unauthorizedError("Not authorized to delete this fitness activity");
  }
  await FitnessActivity.deleteOne({ _id: id });
  return fitnessActivity;
};

export const fitnessActivities = async (_root, _args, { user }) => {
  if (!user) {
    throw unauthorizedError("Missing authentication");
  }
  return FitnessActivity.find({ userId: user._id });
};

export const fitnessActivity = async (_root, { id }, { user }) => {
  if (!user) {
    throw unauthorizedError("Missing authentication");
  }
  const fitnessActivity = await FitnessActivity.findOne({
    _id: id,
    userId: user._id,
  });
  if (!fitnessActivity) {
    throw badRequestError("No fitness activity found with id " + id);
  }
  return fitnessActivity;
};
