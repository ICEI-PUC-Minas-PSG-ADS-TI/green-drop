import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { colors } from "@/themes/index";
import getStyles from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMedal, faTasks, faHistory, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from '@/contexts/UserContext';
import ProtectedRoute from "@/components/ProtectedRoute";
import BottomBar from "@/components/BottomBar";

const ProgressoScreen = () => {
  const { colorScheme } = useTheme();
  const T = colors[colorScheme];   
  const styles = getStyles(colorScheme);
  const { user, desafios = [], conquistas = [], historico = [] } = useUserContext();
  const [activeTab, setActiveTab] = useState("desafios");

  // User stats
  const pontos = user?.pontos || 0;
  const nivel = Math.floor(pontos / 100) + 1;
  const progresso = pontos % 100;
  const proximoNivel = 100 - progresso;
  
  const ReportItem = ({ item }) => {
    const { card: cardColor, text: textColor } = T.statusColors[item.status] || T.statusColors.default;

    return (
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image 
            source={{ uri: item.photo.uri }} 
            style={{ 
              width: 60, 
              height: 60, 
              borderRadius: 8,
              marginRight: 12,
              backgroundColor: styles.medalIconDisabled.color
            }} 
          />
          <View style={{ flex: 1 }}>
            <Text style={[styles.cardTitle, { color: textColor }]}>
              {item.title}
            </Text>
            <Text style={[styles.cardText, { color: textColor, marginBottom: 0 }]}>
              Status: {item.status}
            </Text>
          </View>
        </View>
        <Text style={[styles.completoText, { color: textColor, alignSelf: 'flex-end' }]}>
          {item.points} pontos
        </Text>
      </View>
    );
  };

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.nivelContainer}>
            <FontAwesomeIcon icon={faTrophy} size={40} style={styles.trophyIcon} />
            <Text style={styles.nivelLabel}>Nível {nivel}</Text>
          </View>
          <View style={styles.pontosContainer}>
            <Text style={styles.pontosLabel}>Seus Pontos</Text>
            <Text style={styles.pontosValor}>{pontos} XP</Text>
            <View style={styles.progressoBar}>
              <View style={[styles.progressoFill, { width: `${progresso}%` }]} />
            </View>
            <Text style={styles.proximoNivel}>{proximoNivel} XP para o próximo nível</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "desafios" && styles.tabActive]}
            onPress={() => setActiveTab("desafios")}
          >
            <FontAwesomeIcon icon={faTasks} style={styles.tabIcon} />
            <Text style={styles.tabText}>Desafios</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "conquistas" && styles.tabActive]}
            onPress={() => setActiveTab("conquistas")}
          >
            <FontAwesomeIcon icon={faMedal} style={styles.tabIcon} />
            <Text style={styles.tabText}>Conquistas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "historico" && styles.tabActive]}
            onPress={() => setActiveTab("historico")}
          >
            <FontAwesomeIcon icon={faHistory} style={styles.tabIcon} />
            <Text style={styles.tabText}>Histórico</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {activeTab === "desafios" && (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {desafios?.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.cardText}>{item.descricao}</Text>
                <View style={styles.progressContainer}>
                  <Text style={item.completo ? styles.completoText : styles.progressoText}>
                    {item.progresso}
                  </Text>
                  {item.completo && <FontAwesomeIcon icon={faMedal} style={styles.medalIcon} />}
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {activeTab === "conquistas" && (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {conquistas?.map((item) => (
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
          </ScrollView>
        )}

        {activeTab === "historico" && (
          <FlatList
            contentContainerStyle={styles.contentContainer}
            data={historico}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ReportItem item={item} />}
            ListEmptyComponent={() => (
              <View style={[styles.card, { alignItems: 'center', paddingVertical: 30 }]}>
                <Text style={styles.cardText}>Nenhum reporte encontrado.</Text>
                <Text style={styles.cardText}>
                  Por favor, faça um reporte para vê-lo no histórico.
                </Text>
              </View>
            )}
          />
        )}

      </View>
      <BottomBar />
    </ProtectedRoute>
  );
};

export default ProgressoScreen;