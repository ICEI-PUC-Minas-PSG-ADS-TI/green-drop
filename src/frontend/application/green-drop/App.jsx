import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from './navigation/AppNavigator';
import Layout from './layout';

export default function App() {
  return (
    <NavigationContainer>
      <Layout>
        <AppNavigator />
        <StatusBar
          barStyle={'auto'}
          translucent={true}
        />
      </Layout>
    </NavigationContainer>
  );
};