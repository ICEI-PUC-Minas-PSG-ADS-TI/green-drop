import React, { useState } from "react";
import { View, Text, Button, Switch, TouchableOpacity } from "react-native";
import PersonalHeader from "@/components/PersonalHeader";
import { useTheme } from "@/contexts/ThemeContext";
import getStyles from "./style";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "@/contexts/UserContext";

export default function ConfigScreen() {
  const { colorScheme, toggleTheme } = useTheme();
  const styles = getStyles(colorScheme);
  const navigation = useNavigation();
  const { setLoginStatus, loginStatus } = useUserContext();

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [language, setLanguage] = useState("pt");

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };
  const toggleLoginStatus = () => {
    setLoginStatus((prev) => !prev);
  };

  const changeLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  return (
    <View style={styles.container}>
      <PersonalHeader title="Configurações" />
      {/* Opção: Alternar Tema */}
      <View style={styles.optionContainer}>
        <View style={styles.optionHeader}>
          <Text style={styles.optionHeaderText}>Modo de Tela</Text>
        </View>
        <View style={styles.optionContent}>
          <Button title="Alternar Tema" onPress={toggleTheme} />
        </View>
      </View>

      {/* Opção: Notificações */}
      <View style={styles.optionContainer}>
        <View style={styles.optionHeader}>
          <Text style={styles.optionHeaderText}>Notificações</Text>
        </View>
        <View style={styles.optionContent}>
          <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
        </View>
      </View>
      {/* Opção: Notificações */}
      <View style={styles.optionContainer}>
        <View style={styles.optionHeader}>
          <Text style={styles.optionHeaderText}>Teste status login</Text>
        </View>
        <View style={styles.optionContent}>
          <Switch value={loginStatus} onValueChange={toggleLoginStatus} />
        </View>
      </View>

      {/* Opção: Idioma */}
      <View style={styles.optionContainer}>
        <View style={styles.optionHeader}>
          <Text style={styles.optionHeaderText}>Idioma</Text>
        </View>
        <View style={styles.optionContent}>
          <Button
            title={`Idioma: ${language === "pt" ? "Português" : "English"}`}
            onPress={changeLanguage}
          />
        </View>
      </View>
    </View>
  );
}