import React from 'react';
import { MainView } from './src/views/MainView';
import { StatusBar } from 'react-native';

const App = () => (
  <>
    <StatusBar backgroundColor={'#fff'} />

    <MainView />
  </>
);

export default App;
