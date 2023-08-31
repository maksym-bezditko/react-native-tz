import { getStatusBarHeight } from 'react-native-status-bar-height';

export const HEADER_HEIGHT = 60;

export const STATUS_BAR_HEIGHT = getStatusBarHeight();

type Criteria = {
  lowercaseName: string;
  uppercaseName: string;
};

export const exerciseTypes: Criteria[] = [
  {
    lowercaseName: 'cardio',
    uppercaseName: 'Cardio',
  },
  {
    lowercaseName: 'olympic_weightlifting',
    uppercaseName: 'Olympic Weightlifting',
  },
  {
    lowercaseName: 'plyometrics',
    uppercaseName: 'Plyometrics',
  },
  {
    lowercaseName: 'powerlifting',
    uppercaseName: 'Powerlifting',
  },
  {
    lowercaseName: 'stretching',
    uppercaseName: 'Stretching',
  },
  {
    lowercaseName: 'strongman',
    uppercaseName: 'Strongman',
  },
];

export const exerciseTypesUppercaseNames = exerciseTypes.map(
  item => item.uppercaseName,
);

export const muscles: Criteria[] = [
  {
    lowercaseName: 'abdominals',
    uppercaseName: 'Abdominals',
  },
  {
    lowercaseName: 'abductors',
    uppercaseName: 'Abductors',
  },
  {
    lowercaseName: 'adductors',
    uppercaseName: 'Adductors',
  },
  {
    lowercaseName: 'biceps',
    uppercaseName: 'Biceps',
  },
  {
    lowercaseName: 'calves',
    uppercaseName: 'Calves',
  },
  {
    lowercaseName: 'chest',
    uppercaseName: 'Chest',
  },
  {
    lowercaseName: 'forearms',
    uppercaseName: 'Forearms',
  },
  {
    lowercaseName: 'glutes',
    uppercaseName: 'Glutes',
  },
  {
    lowercaseName: 'hamstrings',
    uppercaseName: 'Hamstrings',
  },
  {
    lowercaseName: 'lats',
    uppercaseName: 'Lats',
  },
  {
    lowercaseName: 'lower_back',
    uppercaseName: 'Lower back',
  },
  {
    lowercaseName: 'middle_back',
    uppercaseName: 'Middle back',
  },
  {
    lowercaseName: 'neck',
    uppercaseName: 'Neck',
  },
  {
    lowercaseName: 'quadriceps',
    uppercaseName: 'Quadriceps',
  },
  {
    lowercaseName: 'traps',
    uppercaseName: 'Traps',
  },
  {
    lowercaseName: 'triceps',
    uppercaseName: 'Triceps',
  },
];

export const musclesUppercaseNames = muscles.map(item => item.uppercaseName);

export const complexityLevels: Criteria[] = [
  {
    lowercaseName: 'beginner',
    uppercaseName: 'Beginner',
  },
  {
    lowercaseName: 'intermediate',
    uppercaseName: 'Intermediate',
  },
  {
    lowercaseName: 'expert',
    uppercaseName: 'Expert',
  },
];

export const complexityLevelsUppercaseNames = complexityLevels.map(
  item => item.uppercaseName,
);

export type Exercise = {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
};
