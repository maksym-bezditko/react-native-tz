import { muscles } from '../models';

export const mapMusclesToLowercaseNames = (uppercaseName: string) =>
  muscles.find(item => item.uppercaseName === uppercaseName)?.lowercaseName;
