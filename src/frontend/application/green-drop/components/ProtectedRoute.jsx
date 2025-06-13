import React from "react";
import { Alert } from "react-native";
import { useUserContext } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";

const ProtectedRoute = ({ children }) => {
  const { loginStatus } = useUserContext();
  const navigation = useNavigation();

  if (!loginStatus) {
    Alert.alert(
      "Acesso Restrito",
      "Você precisa estar logado para acessar esta funcionalidade",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Fazer Login", 
          onPress: () => navigation.navigate("Login") 
        }
      ]
    );
    return null;
  }

  return children;
};

export default ProtectedRoute;