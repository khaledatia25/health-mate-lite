import {
  createCalorieIntake,
  updateCalorieIntake,
  deleteCalorieIntake,
  calorieIntake,
  calorieIntakes,
} from "../../controller/calorieIntake.controller";

export default {
  Query: {
    calorieIntake,
    calorieIntakes,
  },
  Mutation: {
    createCalorieIntake,
    updateCalorieIntake,
    deleteCalorieIntake,
  },
  CalorieIntake: {
    user: (_root, _args, { user }) => user,
  },
};
