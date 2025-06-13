// /contribuir/components/ContribuirLayout.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProgressHeader from './ProgressHeader';
import BottomBar from '@/components/BottomBar';

const ContribuirLayout = ({ currentStep, children, style }) => (
  <View style={styles.container}>
    <ProgressHeader currentStep={currentStep} />
    <View style={[styles.content, style]}>
      {children}
    </View>
    <BottomBar/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    
    marginBottom: 60,
  },
});

export default ContribuirLayout;