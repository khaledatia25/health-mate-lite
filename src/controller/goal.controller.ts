import { unauthorizedError, badRequestError, notFoundError } from "./errors";
import Goal from "../model/Goal";

export const createGoal = async (
  _root,
  { targetSteps, deadline },
  { user }
) => {
  if (!user) {
    throw unauthorizedError("Missing authentication");
  }
  try {
    const goal = new Goal({
      userId: user._id,
      targetSteps,
      deadline: new Date(deadline),
    });
    await goal.save();
    return goal;
  } catch (e) {
    throw badRequestError(e.message);
  }
};

export const updateGoal = async (
  _root,
  { id, targetSteps, deadline },
  { user }
) => {
  if (!user) {
    throw unauthorizedError("Missing authentication");
  }
  const goal = await Goal.findOne({ _id: id, userId: user._id });
  if (!goal) {
    throw notFoundError("No goal found with id " + id);
  }
  try {
    if (targetSteps) goal.targetSteps = targetSteps;
    if (deadline) goal.deadline = new Date(deadline);
    await goal.save();
    return goal;
  } catch (e) {
    throw badRequestError(e.message);
  }
};

export const deleteGoal = async (_root, { id }, { user }) => {
  if (!user) {
    throw unauthorizedError("Missing authentication");
  }
  const goal = await Goal.findOne({ _id: id, userId: user._id });
  if (!goal) {
    throw notFoundError("No goal found with id " + id);
  }
  await Goal.deleteOne({ _id: id });
  return goal;
};

export const goals = async (_root, _args, { user }) => {
  if (!user) {
    throw unauthorizedError("Missing authentication");
  }
  return Goal.find({ userId: user._id });
};

export const goal = async (_root, { id }, { user }) => {
  if (!user) {
    throw unauthorizedError("Missing authentication");
  }
  const goal = await Goal.findOne({ _id: id, userId: user._id });
  if (!goal) {
    throw notFoundError("No goal found with id " + id);
  }
  return goal;
};
