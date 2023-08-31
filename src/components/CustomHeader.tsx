import React from 'react';
import { styled } from 'styled-components/native';
import { HEADER_HEIGHT } from '../models';
import FilterIcon from './icons/FilterIcon';
import { TouchableOpacity } from 'react-native';

type Props = {
  setIsFiltersShown: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CustomHeader = ({ setIsFiltersShown }: Props) => {
  return (
    <HeaderWrapper>
      <HeaderInnerWrapper>
        <HeaderTitle>Exercises</HeaderTitle>

        <TouchableOpacity onPress={() => setIsFiltersShown(prev => !prev)}>
          <FilterIcon />
        </TouchableOpacity>
      </HeaderInnerWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.View``;

const HeaderInnerWrapper = styled.View`
  height: ${HEADER_HEIGHT}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20px;
  position: absolute;
  width: 100%;
  background-color: white;
  z-index: 1000;
  border-bottom-width: 2px;
  border-bottom-color: #ffdbaa;
`;

const HeaderTitle = styled.Text`
  font-weight: 700;
  color: #96c291;
`;
