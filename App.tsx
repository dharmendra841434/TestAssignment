import React from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="dark-content"
      />
      <StackNavigation />
    </>
  );
};

export default App;
