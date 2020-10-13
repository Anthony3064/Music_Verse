/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ReproductorScene from './src/scenes/reproductor/index';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Reproductor" component={ReproductorScene} options={{ title: 'Reproductor' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
