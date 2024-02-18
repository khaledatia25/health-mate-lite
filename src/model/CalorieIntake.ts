import mongoose, { HydratedDocument, InferSchemaType, Schema } from "mongoose";

export interface ICalorienlIntake {
  userId: typeof mongoose.SchemaTypes.ObjectId;
  calories: number;
  date: Date;
  additionalDetails?: string;
}
export interface IFitnessActivityMethods {
  toJSON(): ICalorienlIntake;
}
export interface CalorienlIntakeModel
  extends mongoose.Model<ICalorienlIntake, IFitnessActivityMethods> {}

const schema = new Schema<
  ICalorienlIntake,
  CalorienlIntakeModel,
  IFitnessActivityMethods
>({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  calories: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  additionalDetails: {
    type: String,
    required: false,
  },
});

export type CalorienlIntake = HydratedDocument<
  ICalorienlIntake,
  IFitnessActivityMethods
>;

const CalorienlIntake = mongoose.model<ICalorienlIntake, CalorienlIntakeModel>(
  "CalorienlIntake",
  schema
);

export default CalorienlIntake;
