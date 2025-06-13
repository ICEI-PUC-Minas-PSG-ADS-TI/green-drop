import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import ContribuirLayout from '../components/ContribuirLayout';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import getStyles from './style';

const InfoScreen = () => {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const navigation = useNavigation();
  
  const handleNextStep = () => {
      navigation.navigate('Camera');
  };

  return (
    <ContribuirLayout currentStep={0}>
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Contribua e Ganhe Pontos</Text>
            <Text style={styles.subtitle}>
              Veja como você pode ajudar a melhorar a cidade e ser recompensado
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Como Funciona</Text>
            <Text style={styles.description}>
              Ao relatar um problema da cidade, você receberá pontos baseados na categoria e 
              nível de importância. Metade dos pontos é concedida ao criar o relato, e a outra 
              metade após a verificação positiva.
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categorias de Problemas</Text>
            <View style={styles.pointCard}>
              <Text style={styles.cardTitle}>Tipos de Problemas por Categoria</Text>
              <View style={styles.pointRow}>
                <Text style={styles.pointText}>Infraestrutura e Mobilidade</Text>
                <Text style={styles.pointValue}>Até 90 pts</Text>
              </View>
              <View style={styles.pointRow}>
                <Text style={styles.pointText}>Meio Ambiente</Text>
                <Text style={styles.pointValue}>Até 85 pts</Text>
              </View>
              <View style={styles.pointRow}>
                <Text style={styles.pointText}>Segurança e Saúde Pública</Text>
                <Text style={styles.pointValue}>Até 100 pts</Text>
              </View>
              <View style={styles.pointRow}>
                <Text style={styles.pointText}>Serviços Públicos</Text>
                <Text style={styles.pointValue}>Até 95 pts</Text>
              </View>
              <View style={styles.pointRow}>
                <Text style={styles.pointText}>Espaços Públicos e Lazer</Text>
                <Text style={styles.pointValue}>Até 80 pts</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Níveis de Importância</Text>
            <Text style={styles.description}>
              Cada problema tem um nível de importância que afeta os pontos recebidos:
            </Text>
            <View style={styles.pointCard}>
              <View style={styles.pointRow}>
                <Text style={styles.pointText}>Nível 1 (Menor)</Text>
                <Text style={styles.pointValue}>10-30 pts</Text>
              </View>
              <View style={styles.pointRow}>
                <Text style={styles.pointText}>Nível 2 (Baixo)</Text>
                <Text style={styles.pointValue}>20-40 pts</Text>
              </View>
              <View style={styles.pointRow}>
                <Text style={styles.pointText}>Nível 3 (Médio)</Text>
                <Text style={styles.pointValue}>30-50 pts</Text>
              </View>
              <View style={styles.pointRow}>
                <Text style={styles.pointText}>Nível 4 (Muito Alto)</Text>
                <Text style={styles.pointValue}>50-70 pts</Text>
              </View>
              <View style={styles.pointRow}>
                <Text style={styles.pointText}>Nível 5 (Crítico)</Text>
                <Text style={styles.pointValue}>80-100 pts</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNextStep}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Próximo Passo</Text>
            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ContribuirLayout>
  );
};

export default InfoScreen;