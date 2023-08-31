import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated, Easing } from 'react-native';
import {
  Exercise,
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
  complexityLevelsUppercaseNames,
  exerciseTypesUppercaseNames,
  musclesUppercaseNames,
} from '../models';
import { styled } from 'styled-components/native';
import { DropdownSelector } from './DropdownSelector';
import SelectDropdown from 'react-native-select-dropdown';
import { mapTypesToLowercaseNames } from '../helpers/mapTypesToLowercaseNames';
import { mapComplexityLevelToLowercaseNames } from '../helpers/mapComplexityLevelToLowercaseNames';
import { mapMusclesToLowercaseNames } from '../helpers/mapMusclesToLowercaseNames';

type Props = {
  isFiltersShown: boolean;
  setSelectedType: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedMuscle: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedComplexity: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setIsFiltersShown: React.Dispatch<React.SetStateAction<boolean>>;
  setExerciseData: (val: Exercise[]) => void;
  scrollUp: () => void;
};

export const Filters = ({
  isFiltersShown,
  setSelectedType,
  setSelectedMuscle,
  setSelectedComplexity,
  setIsFiltersShown,
  setExerciseData,
  scrollUp,
}: Props) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const exerciseSelectorRef = useRef<SelectDropdown>(null);
  const muscleSelectorRef = useRef<SelectDropdown>(null);
  const complexitySelectorRef = useRef<SelectDropdown>(null);

  const [type, setType] = useState<string>();
  const [muscle, setMuscle] = useState<string>();
  const [complexity, setComplexity] = useState<string>();

  const wrapperAnimatedStyle = useMemo(
    () => ({
      left: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-1000, 0],
      }),
    }),
    [animatedValue],
  );

  const reset = useCallback(() => {
    exerciseSelectorRef.current?.reset();
    muscleSelectorRef.current?.reset();
    complexitySelectorRef.current?.reset();

    scrollUp();

    setIsFiltersShown(false);

    setSelectedType(undefined);
    setType(undefined);

    setSelectedMuscle(undefined);
    setMuscle(undefined);

    setSelectedComplexity(undefined);
    setComplexity(undefined);

    setTimeout(() => {
      setExerciseData([]);
    }, 500);
  }, [
    scrollUp,
    setIsFiltersShown,
    setSelectedComplexity,
    setSelectedMuscle,
    setSelectedType,
    setExerciseData,
  ]);

  const handleApply = useCallback(() => {
    scrollUp();

    setIsFiltersShown(false);

    setSelectedType(type);
    setSelectedMuscle(muscle);
    setSelectedComplexity(complexity);

    setTimeout(() => {
      setExerciseData([]);
    }, 500);
  }, [
    complexity,
    muscle,
    setIsFiltersShown,
    setSelectedComplexity,
    setSelectedMuscle,
    setSelectedType,
    type,
    scrollUp,
    setExerciseData,
  ]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFiltersShown ? 1 : 0,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.elastic(1),
    }).start();
  }, [isFiltersShown, animatedValue]);

  return (
    <AnimatedFiltersWrapper style={wrapperAnimatedStyle}>
      <Row>
        <DropdownSelector
          data={exerciseTypesUppercaseNames}
          onSelect={uppercaseName =>
            setType(mapTypesToLowercaseNames(uppercaseName))
          }
          defaultButtonText="Type of exercise"
          ddRef={exerciseSelectorRef}
        />

        <DropdownSelector
          data={musclesUppercaseNames}
          onSelect={uppercaseName =>
            setMuscle(mapMusclesToLowercaseNames(uppercaseName))
          }
          defaultButtonText="Muscle to target"
          ddRef={muscleSelectorRef}
        />
      </Row>

      <DropdownSelector
        data={complexityLevelsUppercaseNames}
        onSelect={uppercaseName =>
          setComplexity(mapComplexityLevelToLowercaseNames(uppercaseName))
        }
        defaultButtonText="Complexity level"
        ddRef={complexitySelectorRef}
      />

      <Row>
        <ControlButton onPress={reset}>
          <ControlButtonText>Reset</ControlButtonText>
        </ControlButton>

        <ControlButton isApply onPress={handleApply}>
          <ControlButtonText isApply>Apply</ControlButtonText>
        </ControlButton>
      </Row>
    </AnimatedFiltersWrapper>
  );
};

const AnimatedFiltersWrapper = styled(Animated.View)`
  width: 100%;
  background-color: #ffb7b7;
  z-index: -1;
  position: absolute;
  top: ${STATUS_BAR_HEIGHT + HEADER_HEIGHT}px;
  padding: 20px;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-vertical: 20px;
`;

const ControlButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<{
  isApply?: boolean;
}>`
  width: 40%;
  border-width: 1px;
  border-color: ${({ isApply }) => (isApply ? 'white' : 'black')};
  height: 40px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  background-color: ${({ isApply }) => (isApply ? '#96c291' : '#ffdbaa')};
  margin-top: 50px;
`;

const ControlButtonText = styled.Text<{
  isApply?: boolean;
}>`
  font-size: 10px;
  color: ${({ isApply }) => (isApply ? 'white' : 'black')};
`;
