import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const buttonTextStyle: StyleProp<TextStyle> = { fontSize: 14 };

const buttonStyle: StyleProp<ViewStyle> = {
  backgroundColor: 'white',
  borderRadius: 15,
  width: '40%',
};

const rowStyle: StyleProp<ViewStyle> = {
  height: 40,
  backgroundColor: '#96c291',
  borderRadius: 5,
};

const dropdownStyle: StyleProp<ViewStyle> = {
  backgroundColor: '#96c291',
  borderRadius: 5,
};

type Props = {
  data: string[];
  onSelect: (selectedItem: string) => void;
  defaultButtonText: string;
  ddRef: React.LegacyRef<SelectDropdown> | undefined;
};

export const DropdownSelector = ({
  data,
  onSelect,
  defaultButtonText,
  ddRef,
}: Props) => {
  return (
    <SelectDropdown
      data={data}
      onSelect={onSelect}
      defaultButtonText={defaultButtonText}
      buttonTextStyle={buttonTextStyle}
      buttonStyle={buttonStyle}
      rowStyle={rowStyle}
      rowTextStyle={buttonTextStyle}
      dropdownStyle={dropdownStyle}
      ref={ddRef}
    />
  );
};
