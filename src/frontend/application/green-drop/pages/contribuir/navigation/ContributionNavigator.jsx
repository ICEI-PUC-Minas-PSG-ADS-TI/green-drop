import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InfoScreen from '../explicação';
import CameraScreen from '../camera';
import ContributionPage from '../final';

const Stack = createNativeStackNavigator();

const ContributionNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
    <Stack.Screen name="Explicacao" component={InfoScreen} />
    <Stack.Screen name="Camera" component={CameraScreen} />
    <Stack.Screen name="Final" component={ContributionPage} />
  </Stack.Navigator>
);

export default ContributionNavigator;