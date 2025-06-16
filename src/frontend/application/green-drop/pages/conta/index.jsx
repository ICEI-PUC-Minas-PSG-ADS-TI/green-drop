import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PersonalHeader from "@/components/PersonalHeader";
import getStyles from "./style";
import { useTheme } from "@/contexts/ThemeContext";
import UserPlaceholder from "@/assets/UserPlaceholder.png";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "@/contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@/themes/index";

export default function Conta() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const navigation = useNavigation();
  const { loginStatus, user, logoutUsuario } = useUserContext();

  // Use real user data if available
  const usuario = user || {
    displayName: "Kaiser",
    telefone: "+55 (31)9999-99999",
    email: "naoadicionado@example.com",
    pontos: 90,
  };

  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <PersonalHeader
        title="Perfil"
        right={
          <TouchableOpacity
            onPress={() => navigation.navigate("Configurações")}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <FontAwesomeIcon
              icon={faGear}
              size={22}
              color={
                colorScheme === "dark"
                  ? colors.dark.text
                  : colors.light.text
              }
            />
          </TouchableOpacity>
        }
      />
      <View style={styles.box}>
        <View style={styles.userLogoBoxContainer}>
          <View style={styles.userLogoBox}>
            <Image
              source={UserPlaceholder}
              style={styles.userImage}
              resizeMode="contain"
            />
          </View>
        </View>
        {loginStatus ? (
          <View style={styles.logBox}>
            <Text style={styles.userName} numberOfLines={2}>
              {usuario.displayName}
            </Text>
            <View style={styles.userContactBox}>
              <Text style={styles.userContacHead}>Contato do usuário:</Text>
              <Text style={styles.userContacText}>
                Telefone: {usuario.telefone}
              </Text>
              <Text style={styles.userContacText}>
                E-mail: {usuario.email}
              </Text>
            </View>
            <View style={styles.userPointsBox}>
              <Text style={styles.userPointsHead}>Pontos do usuário:</Text>
              <Text style={styles.userPointsText}>{usuario.pontos}</Text>
            </View>
            <TouchableOpacity
              style={styles.authButton}
              onPress={logoutUsuario}
            >
              <Text style={styles.authButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.noLogBox}>
            <Text style={styles.noLogText}>
              Para ver suas informações{"\n"} realize login
            </Text>
            <TouchableOpacity
              style={styles.authButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.authButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
    </SafeAreaProvider>
  );
}