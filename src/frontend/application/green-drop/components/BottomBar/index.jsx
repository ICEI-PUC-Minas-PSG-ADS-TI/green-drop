import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useTheme } from "@/contexts/ThemeContext";
import { useUserContext } from "@/contexts/UserContext";
import getStyles from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { 
  faPlusCircle, 
  faMapMarkerAlt, 
  faTrophy,
  faUser
} from "@fortawesome/free-solid-svg-icons";

export default function BottomBar() {
  const navigation = useNavigation();
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const { loginStatus } = useUserContext();

  // Função para verificar login
  const handleProtectedNavigation = (routeName) => {
    // Verifica se o usuário está logado
    if (!loginStatus) {
      Alert.alert(
        "Login Necessário",
        "Você precisa estar logado para acessar esta funcionalidade",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
    } else {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.iconBox}
        onPress={() => handleProtectedNavigation('Progresso')}>
        <FontAwesomeIcon icon={faTrophy} size={26} style={styles.icon} />
        <Text style={styles.iconText}>Progresso</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.iconBox} 
        onPress={() => navigation.navigate('Mapa')}>
        <FontAwesomeIcon icon={faMapMarkerAlt} size={26} style={styles.icon} />
        <Text style={styles.iconText}>Explorar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.iconBox} 
        onPress={() => handleProtectedNavigation('Contribuir')}>
        <FontAwesomeIcon icon={faPlusCircle} size={30} style={styles.icon} />
        <Text style={styles.iconText}>Contribuir</Text>
      </TouchableOpacity>
    </View>
  );
}