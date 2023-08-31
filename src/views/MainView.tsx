import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { styled } from 'styled-components/native';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { CustomHeader } from '../components/CustomHeader';
import { Exercise, HEADER_HEIGHT } from '../models';
import { Filters } from '../components/Filters';
import axios from 'axios';
import { ExerciseItem } from '../components/ExerciseItem';

const API_KEY = 'PTb9diQEQm5Tthq+PDz0cA==GhoxGW6eCyU8J1Fi'; // should be stored in the .env file
const BASE_URL = 'https://api.api-ninjas.com/v1/exercises/';

export const MainView = () => {
  const flatlistRef = useRef<FlatList>(null);

  const [isFiltersShown, setIsFiltersShown] = useState(false);

  const [selectedType, setSelectedType] = useState<string>();
  const [selectedMuscle, setSelectedMuscle] = useState<string>();
  const [selectedComplexity, setSelectedComplexity] = useState<string>();

  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [allContentLoaded, setAllContentLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchText, setSearchText] = useState('');

  const ListFooterComponent = useMemo(
    () => (
      <Spacer height={400}>
        {isLoading ? <Text>Loading...</Text> : undefined}
      </Spacer>
    ),
    [isLoading],
  );

  const fetchExercises = useCallback(
    () =>
      axios.get<Exercise[]>(BASE_URL, {
        params: {
          type: selectedType,
          muscle: selectedMuscle,
          difficulty: selectedComplexity,
          offset: exerciseData.length,
        },
        headers: {
          'X-Api-Key': API_KEY,
        },
      }),
    [exerciseData.length, selectedComplexity, selectedMuscle, selectedType],
  );

  const loadMore = useCallback(() => {
    if (isLoading || searchText) {
      return;
    }

    setCurrentPage(currentPage + 1);

    setIsLoading(true);

    fetchExercises().then(exercises => {
      setIsLoading(false);

      if (exercises.data.length === 0) {
        setAllContentLoaded(true);
      } else {
        setExerciseData(prev => [...prev, ...exercises.data]);
      }
    });
  }, [currentPage, fetchExercises, isLoading, searchText]);

  const handleEndReached = useCallback(() => {
    if (allContentLoaded) {
      return;
    }

    loadMore();
  }, [allContentLoaded, loadMore]);

  const loadFirstPage = useCallback(() => {
    setIsLoading(true);
    setExerciseData([]);
    setCurrentPage(0);
    setAllContentLoaded(false);

    fetchExercises().then(exercises => {
      setIsLoading(false);
      setExerciseData(exercises.data);
    });
  }, [fetchExercises]);

  const scrollUp = () =>
    flatlistRef.current?.scrollToOffset({ animated: true, offset: 0 });

  const filteredExerciseData = useMemo(
    () => exerciseData.filter(item => item.name.startsWith(searchText)),
    [exerciseData, searchText],
  );

  const ListHeaderComponent = useMemo(
    () => (
      <ListHeaderWrapper>
        <SearchInput
          placeholder="Search by name"
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />

        {filteredExerciseData.length === 0 && !isLoading && (
          <Spacer height={400}>
            <Text>No such items(</Text>
          </Spacer>
        )}
      </ListHeaderWrapper>
    ),
    [filteredExerciseData.length, isLoading, searchText],
  );

  useEffect(() => {
    if (exerciseData.length === 0 && !searchText) {
      loadFirstPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    exerciseData.length,
    selectedComplexity,
    selectedMuscle,
    selectedType,
    searchText,
  ]);

  return (
    <MainViewWrapper>
      <CustomHeader setIsFiltersShown={setIsFiltersShown} />

      <Filters
        isFiltersShown={isFiltersShown}
        setIsFiltersShown={setIsFiltersShown}
        setSelectedType={setSelectedType}
        setSelectedMuscle={setSelectedMuscle}
        setSelectedComplexity={setSelectedComplexity}
        setExerciseData={setExerciseData}
        scrollUp={scrollUp}
      />

      <FlatListWrapper
        data={filteredExerciseData}
        ref={flatlistRef}
        renderItem={({ item }) => <ExerciseItem {...item} />}
        keyExtractor={(_, index) => `${index}`}
        ListFooterComponent={ListFooterComponent}
        ListHeaderComponent={ListHeaderComponent}
        onEndReachedThreshold={0.5}
        onEndReached={exerciseData.length === 0 ? undefined : handleEndReached}
      />
    </MainViewWrapper>
  );
};

const MainViewWrapper = styled(SafeAreaView)``;

const FlatListWrapper = styled.FlatList`
  background-color: #ffdbaa;
  z-index: -5;
  padding-top: ${HEADER_HEIGHT + 20}px;
  position: relative;
  overflow: hidden;
  min-height: 100%;
` as unknown as typeof FlatList;

const Spacer = styled.View<{
  height: number;
}>`
  height: ${({ height }) => height}px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding-top: 50px;
`;

const SearchInput = styled.TextInput`
  background-color: white;
  margin-horizontal: 20px;
  height: 40px;
  border-radius: 20px;
  padding-left: 10px;
  margin-bottom: 40px;
`;

const ListHeaderWrapper = styled.View``;
