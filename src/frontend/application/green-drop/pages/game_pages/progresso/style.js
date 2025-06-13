/* eslint-disable react-native/sort-styles */
import { StyleSheet } from "react-native";
import { colors } from "@/themes/index";

const getStyles = (theme) => {
  const themeColors = colors[theme];
  const customColors = colors.custom;
  
  return StyleSheet.create({
    container: {
      backgroundColor: themeColors.appBackground,
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      padding: 15,
      justifyContent: 'space-between',
    },
    header: {
      alignItems: 'center',
      backgroundColor: themeColors.surface,
      borderBottomColor: themeColors.divider,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
    },
    nivelContainer: {
      alignItems: 'center',
    },
    nivelLabel: {
      color: themeColors.title,
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 5,
    },
    pontosContainer: {
      alignItems: 'center',
    },
    pontosLabel: {
      color: themeColors.textSecondary,
      fontSize: 16,
    },
    pontosValor: {
      color: themeColors.title,
      fontSize: 36,
      fontWeight: 'bold',
      marginTop: 5,
    },
    progressoBar: {
      backgroundColor: themeColors.divider,
      borderRadius: 4,
      height: 8,
      marginVertical: 5,
      overflow: 'hidden',
      width: 150,
    },
    progressoFill: {
      backgroundColor: customColors.progressFill,
      height: '100%',
    },
    proximoNivel: {
      color: themeColors.textSecondary,
      fontSize: 12,
      marginTop: 5,
    },
    trophyIcon: {
      color: customColors.amber,
      marginBottom: 5,
    },
    tabsContainer: {
      borderBottomColor: themeColors.divider,
      borderBottomWidth: 1,
      flexDirection: 'row',
    },
    tab: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 15,
    },
    tabActive: {
      borderBottomColor: customColors.amber,
      borderBottomWidth: 3,
    },
    tabIcon: {
      color: themeColors.textSecondary,
      marginRight: 8,
    },
    tabText: {
      color: themeColors.title,
      fontSize: 16,
      fontWeight: '500',
    },
    content: {
      padding: 15,
    },
    card: {
      backgroundColor: themeColors.surface,
      borderRadius: 10,
      elevation: 2,
      marginBottom: 15,
      padding: 15,
      shadowColor: theme === 'dark' ? colors.custom.darkBg : colors.custom.grayDarker,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    cardHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 5,
    },
    cardTitle: {
      color: themeColors.title,
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    cardText: {
      color: themeColors.textTertiary,
      fontSize: 14,
      marginBottom: 10,
    },
    progressContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    progressoText: {
      color: customColors.orange,
      fontWeight: '600',
    },
    completoText: {
      color: customColors.progressFill,
      fontWeight: '600',
    },
    pendenteText: {
      color: customColors.disabledGray,
      fontStyle: 'italic',
    },
    medalIcon: {
      color: customColors.amber,
    },
    medalIconDisabled: {
      color: theme === 'dark' ? themeColors.divider : colors.custom.grayMid,
    },
  });
};

export default getStyles;