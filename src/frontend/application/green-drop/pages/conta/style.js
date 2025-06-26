import { StyleSheet } from "react-native";
import { colors, shadows } from "@/themes/index";

const getStyles = (theme) => {
  const isDark = theme === "dark";
  return StyleSheet.create({
    authButton: {
      alignItems: 'center',
      backgroundColor: colors[theme].button,
      borderColor: colors[theme].button,
      borderRadius: 8,
      borderWidth: 1,
      marginBottom: 8,
      marginTop: 16,
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
    authButtonText: {
      color: colors[theme].buttonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    container: {
      backgroundColor: isDark ? colors.dark.pageBackground : colors.light.pageBackground,
      flex: 1,
    },
    title: {
      color: isDark ? colors.dark.text : colors.light.text,
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 24,
      marginTop: 24,
      textAlign: 'center',
    },
    // eslint-disable-next-line react-native/sort-styles
    box: {
      alignSelf: "center",
      backgroundColor: isDark ? colors.dark.boxBackground : colors.light.boxBackground,
      borderRadius: 20,
      flex: 8,
      margin: 20,
      overflow: 'hidden',
      paddingTop: 20,
      // eslint-disable-next-line react-native/sort-styles
      height: '90%',
      width: '80%',
    },
    userLogoBoxContainer: {
      alignSelf: 'center',
      borderRadius: 30,
      height: 150,
      marginBottom: 16,
      width: 150,
      ...(isDark ? shadows.dark.full : shadows.light.full),
      elevation: 5, 
    },
    userLogoBox: {
      borderRadius: 30,
      height: '100%',
      overflow: 'hidden',
      width: '100%',
    },
    userImage: {
      height: '100%',
      width: '100%',
    },
    logBox:{
      flex: 6,
    },
    userName: {
      color: isDark ? colors.dark.text : colors.light.text,
      flex: 0,
      fontSize: 30,
      marginBottom: 16,
      minHeight: 25,
      textAlign: 'center',
    },
    userContactBox: {
      flex: 2,
      marginBottom: 16,
      paddingHorizontal: 16,
    },
    userContacHead: {
      backgroundColor: isDark ? colors.dark.sectionTitleBackground : colors.light.sectionTitleBackground,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
      paddingVertical: 4,
      textAlign: 'center',
    },
    userContacText: {
      color: isDark ? colors.dark.text : colors.light.text,
      fontStyle: 'italic',
      fontWeight: '600',
      marginBottom: 4,
    },
    userPointsBox: {
      alignItems: 'center',
      flex: 3,
      marginBottom: 16,
    },
    userPointsHead: {
      color: isDark ? colors.dark.text : colors.light.text,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    userPointsText: {
      color: isDark ? colors.dark.pointsText : colors.light.pointsText,
      fontSize: 48,
      fontStyle: 'italic',
      ...(isDark ? shadows.dark.text : shadows.light.text),
    },
    authButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 16,
      paddingHorizontal: 16,
    },
    noLogBox: {
      alignItems: 'center',
      flex: 6,
      justifyContent: 'center',
    },
    noLogText: {
      color: isDark ? colors.dark.text : colors.light.text,
      fontSize: 20,
      textAlign: 'center'
    },
  });
};

export default getStyles;