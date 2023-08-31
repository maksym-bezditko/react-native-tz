import { exerciseTypes } from '../models';

export const mapTypesToLowercaseNames = (uppercaseName: string) =>
  exerciseTypes.find(item => item.uppercaseName === uppercaseName)
    ?.lowercaseName;
