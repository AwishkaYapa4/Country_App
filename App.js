import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import CountryListScreen from './screens/CountryListScreen';
import CountryDetailsScreen from './screens/CountryDetailsScreen';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: { backgroundColor: '#2b7cff' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Countries" 
          component={CountryListScreen} 
          options={{ title: '🌍 Country List' }}
        />
        <Stack.Screen 
          name="Details" 
          component={CountryDetailsScreen} 
          options={{ title: 'Country Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
