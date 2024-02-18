import {
  createFitnessActivity,
  updateFitnessActivity,
  deleteFitnessActivity,
  fitnessActivities,
  fitnessActivity,
} from "../../controller/fitnessActivity.controller";

export default {
  Query: {
    fitnessActivity,
    fitnessActivities,
  },
  Mutation: {
    createFitnessActivity,
    updateFitnessActivity,
    deleteFitnessActivity,
  },
  FitnessActivity: {
    user: (_root, _args, { user }) => user,
  },
};
