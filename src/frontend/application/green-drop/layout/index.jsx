import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import getStyles from "./style";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext"
import { UserProvider } from "@/contexts/UserContext";

const LayoutContent = ({ children }) => {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  return (
    <SafeAreaView
      style={styles.Layout}
      edges={['bottom', 'left', 'right']}
    >
      <View style={styles.Layout_Body}>
        <View style={styles.Layout_Content}>
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <LayoutContent>{children}</LayoutContent>
      </UserProvider>
    </ThemeProvider>
  );
}