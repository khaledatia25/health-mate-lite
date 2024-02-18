import { getUser } from "../../controller/user.controller";
import { goals } from "../../controller/goal.controller";
import { fitnessActivities } from "../../controller/fitnessActivity.controller";
import { calorieIntakes } from "../../controller/calorieIntake.controller";
export default {
  Query: {
    user: getUser,
  },
  User: {
    goals: goals,
    fitnessActivities: fitnessActivities,
    calorieIntakes,
  },
};
