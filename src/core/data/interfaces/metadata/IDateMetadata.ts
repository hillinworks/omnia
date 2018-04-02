import { DateMode } from "./DateMode";

export interface IDateMetadata {
  minValue?: Date;
  maxValue?: Date;
  defaultValue?: Date;
  mode: DateMode;
}
