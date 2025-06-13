import { StyleSheet } from "react-native";
import { colors, shadows } from "@/themes/index";

const getStyles = (theme) => {
  const isDark = theme === "dark";
  return StyleSheet.create({
    container: {
      backgroundColor: isDark ? colors.dark.pageBackground : colors.light.pageBackground,
      flex: 1,
    },
    optionContainer: {
      backgroundColor: isDark ? colors.dark.boxBackground : colors.light.boxBackground,
      borderRadius: 10,
      marginHorizontal: 16,
      marginVertical: 8,
      overflow: "hidden",
      ...(isDark ? shadows.dark.full : shadows.light.full),
    },
    optionContent: {
      padding: 12,
    },
    optionHeader: {
      backgroundColor: isDark ? colors.dark.sectionTitleBackground : colors.light.sectionTitleBackground,
      padding: 12,
    },
    optionHeaderText: {
      color: isDark ? colors.dark.text : colors.light.text,
      fontSize: 18,
      fontWeight: "bold",
    },
  });
};

export default getStyles;