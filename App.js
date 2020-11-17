/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Drawer from './src/components/atom/Drawer';

import { NavigationContainer } from '@react-navigation/native';
import ReproductorScene from './src/scenes/reproductor/index';

const App = () => {
  return (
    <NavigationContainer>
      < Drawer />
      {/* <Stack.Navigator >
        <Stack.Screen name="Reproductor" component={ReproductorScene} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default App;
