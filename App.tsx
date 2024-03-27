import 'react-native-get-random-values';
import React, { useState, useEffect, useRef } from "react";
import { Linking } from 'react-native';
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import OrganizationScreen from "./src/screens/OrganizationScreen";
import VotingDetailScreen from './src/screens/VotingDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootStackParamList = {
  LoginScreen: undefined;
  OrganizationScreen: { userPublicKey: Uint8Array };
  VotingDetailScreen: undefined;
};

const App: React.FC = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<any>();
  const ref = useRef<NavigationContainer>();

  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['myapp://', 'https://myapp.com'], // Add your URL prefixes
    config: {
      screens: {
        OrganizationScreen: 'onConnect', // Path used in the deep link
      },
    },
    async getInitialState() {
      // Handle deep link state initialization
      const state = await Linking.getInitialURL();
      if (state !== null) {
        // Process the deep link state as needed
      }
      return state;
    },
  };

  useEffect(() => {
    if (isReady) return;
    (async () => {
      const state = await linking.getInitialState();
      if (state) {
        setInitialState(state);
      }
      setIsReady(true);
    })();
  }, [isReady, linking]);

  if (!isReady) {
    return null; // You might want to return a loading indicator here
  }

  return (
    <NavigationContainer linking={linking} ref={ref} initialState={initialState}>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="OrganizationScreen" component={OrganizationScreen}/>
        <Stack.Screen name='VotingDetailScreen' component={VotingDetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
