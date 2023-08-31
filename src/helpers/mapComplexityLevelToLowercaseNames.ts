import { complexityLevels } from '../models';

export const mapComplexityLevelToLowercaseNames = (uppercaseName: string) =>
  complexityLevels.find(item => item.uppercaseName === uppercaseName)
    ?.lowercaseName;
