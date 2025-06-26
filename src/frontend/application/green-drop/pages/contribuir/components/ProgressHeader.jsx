import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { progressHeaderColors } from '@/themes/index';
import { useTheme } from '@/contexts/ThemeContext';


const steps = ['Explicação', 'Câmera', 'Final'];

const ProgressHeader = ({ currentStep }) => {
  const { colorScheme } = useTheme();
  const colors = progressHeaderColors[colorScheme];
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View style={[
            styles.circle,
            { backgroundColor: currentStep === index ? colors.activeIcon : colors.inactiveIcon },
            { borderColor: colors.border, borderWidth: 1 }
          ]}>
            <Text style={[
              styles.stepText,
              { color: currentStep === index ? colors.activeText : colors.inactiveText }
            ]}>
              {index + 1}
            </Text>
          </View>
          <Text style={[
            styles.label,
            { color: colors.text },
            currentStep === index && { color: colors.border, fontWeight: 'bold' }
          ]}>
            {step}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  stepContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  }
});

export default ProgressHeader;