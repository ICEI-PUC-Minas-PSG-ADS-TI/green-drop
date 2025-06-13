import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, SectionList } from "react-native";
import { useTheme } from "@/contexts/ThemeContext"; 
import getStyles from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMedal, faTasks, faHistory, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from '@/contexts/UserContext' 
import ProtectedRoute from "@/components/ProtectedRoute";
import BottomBar from "@/components/BottomBar";

const ProgressoScreen = () => {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const { user, desafios, conquistas } = useUserContext();
  const [activeTab, setActiveTab] = useState("desafios");

  // Dados do usuário
  const userStats = {
    pontos: user?.pontos || 0,
    nivel: Math.floor((user?.pontos || 0) / 100) + 1,
    progresso: ((user?.pontos || 0) % 100),
    proximoNivel: 100 - ((user?.pontos || 0) % 100)
  };

  return (
    <ProtectedRoute>
      <ScrollView style={styles.container}>
        {/* Cabeçalho de Progresso */}
        <View style={styles.header}>
          <View style={styles.nivelContainer}>
            <FontAwesomeIcon icon={faTrophy} size={40} style={styles.trophyIcon} />
            <Text style={styles.nivelLabel}>Nível {userStats.nivel}</Text>
          </View>

          <View style={styles.pontosContainer}>
            <Text style={styles.pontosLabel}>Seus Pontos</Text>
            <Text style={styles.pontosValor}>{userStats.pontos} XP</Text>
            <View style={styles.progressoBar}>
              <View style={[styles.progressoFill, { width: `${userStats.progresso}%` }]} />
            </View>
            <Text style={styles.proximoNivel}>
              {userStats.proximoNivel} XP para o próximo nível
            </Text>
          </View>
        </View>

        {/* Abas de Navegação */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "desafios" && styles.tabActive]}
            onPress={() => setActiveTab("desafios")}>
            <FontAwesomeIcon icon={faTasks} style={styles.tabIcon} />
            <Text style={styles.tabText}>Desafios</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "conquistas" && styles.tabActive]}
            onPress={() => setActiveTab("conquistas")}>
            <FontAwesomeIcon icon={faMedal} style={styles.tabIcon} />
            <Text style={styles.tabText}>Conquistas</Text>
          </TouchableOpacity>
        </View>

        {/* Conteúdo Dinâmico */}
        {activeTab === "desafios" && (
          <View style={styles.content}>
            {desafios.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.cardText}>{item.descricao}</Text>
                <View style={styles.progressContainer}>
                  <Text style={item.completo ? styles.completoText : styles.progressoText}>
                    {item.progresso}
                  </Text>
                  {item.completo && (
                    <FontAwesomeIcon icon={faMedal} style={styles.medalIcon} />
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === "conquistas" && (
          <View style={styles.content}>
            {conquistas.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <FontAwesomeIcon
                    icon={faMedal}
                    style={item.completo ? styles.medalIcon : styles.medalIconDisabled}
                  />
                  <Text style={styles.cardTitle}>{item.titulo}</Text>
                </View>
                <Text style={styles.cardText}>{item.descricao}</Text>
                <Text style={item.completo ? styles.completoText : styles.pendenteText}>
                  {item.completo ? "Conquista desbloqueada!" : "Em progresso..."}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      {/* Barra Inferior */}
      <BottomBar />
    </ProtectedRoute>
  );
};

export default ProgressoScreen;