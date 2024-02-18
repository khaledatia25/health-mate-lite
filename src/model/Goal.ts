import mongoose, { HydratedDocument, Schema } from "mongoose";
export interface IGoal {
  userId: typeof mongoose.SchemaTypes.ObjectId;
  targetSteps: number;
  deadline: Date;
}

export interface IGoalMethods {
  toJSON(): IGoal;
}

export interface GoalModel extends mongoose.Model<IGoal, IGoalMethods> {}

const schema = new Schema<IGoal, GoalModel, IGoalMethods>({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  targetSteps: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
    validate(value: Date) {
      if (value < new Date()) {
        throw new Error("Deadline must be in the future");
      }
    },
  },
});

export type Goal = HydratedDocument<IGoal, IGoalMethods>;

const Goal = mongoose.model<IGoal, GoalModel>("Goal", schema);

export default Goal;
