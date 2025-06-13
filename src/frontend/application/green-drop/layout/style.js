import React from "react";
import { StyleSheet, Platform, StatusBar } from "react-native";

const getStyles = (theme) => StyleSheet.create({
  Layout: {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
  },
  Layout_Body: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  Layout_Content: {
    flex: 1,
  },
});

export default getStyles;