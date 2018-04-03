import { IEnumValue } from "../IEnumValue";

export interface IEnumeration {
  key: string;
  isObsolete: boolean;
  name: string;
  description?: string;
  values: IEnumValue[];
}
