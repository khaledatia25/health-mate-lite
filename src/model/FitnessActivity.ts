import mongoose, { HydratedDocument, InferSchemaType, Schema } from "mongoose";

export interface IFitnessActivity {
  userId: typeof mongoose.SchemaTypes.ObjectId;
  steps: number;
  date: Date;
  additionalDetails?: string;
}

export interface IFitnessActivityMethods {
  toJSON(): IFitnessActivity;
}

export interface FitnessActivityModel
  extends mongoose.Model<IFitnessActivity, IFitnessActivityMethods> {}

const schema = new Schema<
  IFitnessActivity,
  FitnessActivityModel,
  IFitnessActivityMethods
>({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  steps: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    validate(value: Date) {
      if (value < new Date()) {
        throw new Error("Deadline must be in the future");
      }
    },
  },
  additionalDetails: {
    type: String,
    required: false,
  },
});

export type FitnessActivity = HydratedDocument<
  IFitnessActivity,
  IFitnessActivityMethods
>;

const FitnessActivity = mongoose.model<IFitnessActivity, FitnessActivityModel>(
  "FitnessActivity",
  schema
);

export default FitnessActivity;
