import React from 'react';

import { styled } from 'styled-components/native';
import { Exercise } from '../models';

type Props = Exercise;

export const ExerciseItem = ({
  difficulty,
  equipment,
  muscle,
  name,
  instructions,
  type,
}: Props) => {
  return (
    <ExerciseItemWrapper>
      <RegularText>
        <BoldText>Name: </BoldText>
        {name}
      </RegularText>
      <RegularText>
        <BoldText>Type: </BoldText>
        {type}
      </RegularText>
      <RegularText>
        <BoldText>Difficulty: </BoldText>
        {difficulty}
      </RegularText>
      <RegularText>
        <BoldText>Equipments: </BoldText>
        {equipment}
      </RegularText>
      <RegularText>
        <BoldText>Muscle: </BoldText>
        {muscle}
      </RegularText>
      <RegularText>
        <BoldText>Inscructions: </BoldText>
        {instructions}
      </RegularText>
    </ExerciseItemWrapper>
  );
};

const ExerciseItemWrapper = styled.View`
  background-color: white;
  margin: 10px 20px;
  padding: 10px;
  border-radius: 20px;
`;

const BoldText = styled.Text`
  font-weight: bold;
`;

const RegularText = styled.Text`
  margin-vertical: 10px;
`;
