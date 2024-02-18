import {
  createGoal,
  deleteGoal,
  updateGoal,
  goal,
  goals,
} from "../../controller/goal.controller";
export default {
  Query: {
    goal,
    goals,
  },
  Mutation: {
    createGoal,
    updateGoal,
    deleteGoal,
  },
  Goal: {
    user: async (_root, _args, { user }) => user,
  },
};
