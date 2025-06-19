import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import getStyles from './style';
import ContribuirLayout from '../components/ContribuirLayout';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { imageUploader } from '@/services/ImageUploader';

// ---- Constants ----
// Categorias e níveis de importância
const CATEGORIES = [
  { id: 'infra', name: 'Infraestrutura e Mobilidade', icon: 'construct', description: 'Problemas relacionados a vias, calçadas, iluminação e transporte público' },
  { id: 'meio-ambiente', name: 'Meio Ambiente', icon: 'leaf', description: 'Questões ambientais, como poluição e conservação' },
  { id: 'seguranca', name: 'Segurança e Saúde Pública', icon: 'shield-checkmark', description: 'Problemas relacionados à segurança pública e saúde' },
  { id: 'servicos', name: 'Serviços Públicos', icon: 'flash', description: 'Questões relacionadas a serviços públicos, como água e energia' },
  { id: 'espacos', name: 'Espaços Públicos e Lazer', icon: 'basketball', description: 'Problemas em parques, praças e áreas de lazer' }
];

const IMPORTANCE_LEVELS = [
  { id: 1, name: 'Menor', description: 'Impacto mínimo, urgência trivial' },
  { id: 2, name: 'Baixo', description: 'Baixo impacto, baixa urgência' },
  { id: 3, name: 'Médio', description: 'Impacto moderado, urgência média' },
  { id: 4, name: 'Alto', description: 'Alto impacto, alta urgência' },
  { id: 5, name: 'Crítico', description: 'Impacto catastrófico, urgência máxima' }
];

// Tipos de problemas específicos por categoria
const PROBLEM_TYPES = {
  'infra': [
    'Vias e Pavimentação',
    'Iluminação Pública',
    'Calçadas Danificadas',
    'Congestionamento',
    'Transporte Público Ineficiente'
  ],
  'meio-ambiente': [
    'Acúmulo de Lixo em Via Pública',
    'Desmatamento/Poda Ilegal',
    'Poluição do Ar',
    'Poluição da Água',
    'Ilhas de Calor Urbanas'
  ],
  'seguranca': [
    'Acidentes de Trânsito',
    'Vandalismo e Pichações',
    'Crimes',
    'Problemas relacionados a saúde'
  ],
  'servicos': [
    'Falhas no Abastecimento de Água',
    'Problemas de Esgoto',
    'Quedas de Energia Elétrica'
  ],
  'espacos': [
    'Danos a Parques e Praças',
    'Poluição Sonora'
  ]
};

export default function FinalScreen() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation();
  const route = useRoute();

  const photoData = route.params?.photoData;

  // ---- State ----
  const [category, setCategory] = useState(null);
  const [problemType, setProblemType] = useState(null);
  const [importance, setImportance] = useState(null);
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState({ initial: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState({ type: null, visible: false });
  const types = category ? PROBLEM_TYPES[category.id] : [];

  // ---- Effects ----
  const selectCategory = (category) => {
    setCategory(category);
    setProblemType(null);
  };

  const selectProblemType = (type) => {
    setProblemType(type);
    setShowModal({ type: null, visible: false });
  };
  // ---- Handlers ----
  const handleSubmit = async () => {
    if (!category) {
      Alert.alert('Informação Faltando', 'Por favor, selecione uma categoria de problema.');
      return;
    }

    if (!problemType) {
      Alert.alert('Informação Faltando', 'Por favor, selecione um tipo específico de problema.');
      return;
    }

    if (!importance) {
      Alert.alert('Informação Faltando', 'Por favor, indique o nível de importância do problema.');
      return;
    }

    setLoading(true);
    const payload = {
      category: category.id,
      problemType,
      importance: importance.id,
      description: description.trim(),
      latitude: photoData?.location?.latitude,
      longitude: photoData?.location?.longitude,
      createdAt: new Date().toISOString(),
    };

    try {
      if (__DEV__) {
        setPoints({ initial: 30, total: 60 })
        setSuccess(true);
      }
      else {
        const res = await imageUploader.uploadProblemReport(payload, photoData);
        console.log('Server response:', res);
        // Also set points from the back end
        // setPoints({ initial: pontosIniciais, total: pontosFinais });
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Falha no envio. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const closeSuccess = () => {
    setSuccess(false);
    navigation.navigate('Mapa');
  };
  const handleBack = () => {
    navigation.goBack();
  };

  // ---- Render Modals ----
  const ProblemModal = () => (
    <Modal visible={showModal.visible && showModal.type === 'problem'} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Selecione o Tipo de Problema</Text>
          <ScrollView>
            {types.map((type, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => selectProblemType(type)}
              >
                <Text style={styles.modalOptionText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowModal({ type: null, visible: false })}
          >
            <Text style={styles.closeButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const SuccessModal = () => (
    <Modal visible={success} transparent animationType="fade" onRequestClose={closeSuccess}>
      <View style={styles.modalContainer}>
        <View style={styles.successModal}>
          <Ionicons
            name="checkmark-circle"
            size={80}
            color="#4CD964"
            style={styles.successIcon}
          />
          <Text style={styles.successTitle}>Relato Enviado com Sucesso!</Text>
          <Text style={styles.successMessage}>
            Obrigado por contribuir para melhorar nossa cidade. Seu relato será analisado em breve.
          </Text>

          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>Você ganhou</Text>
            <Text style={styles.pointsValue}>{points.initial} pontos</Text>
            <Text style={styles.pointsSubtext}>
              Mais {points.total - points.initial} pontos serão concedidos após a verificação!
            </Text>
          </View>

          <TouchableOpacity style={styles.doneButton} onPress={closeSuccess}>
            <Text style={styles.doneButtonText}>Concluir</Text>
            <Ionicons name="checkmark" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // ---- JSX ----
  return (
    <ContribuirLayout currentStep={2}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            {photoData && (
              <View>
                <Image source={{ uri: photoData.uri }} style={styles.photoPreview} />
                <View style={styles.locationInfo}>
                  <Ionicons name="location" size={16} color={isDarkMode ? '#ccc' : '#333'} />
                  <Text style={styles.locationText}>
                    Localização:{" "}
                    {photoData.location
                      ? `${photoData.location.latitude.toFixed(6)}, ${photoData.location.longitude.toFixed(6)}`
                      : "Localização não disponível"
                    }
                  </Text>
                </View>
              </View>
            )}
            <Text style={styles.sectionTitle}>Categoria do Problema</Text>
            <View style={styles.categoriesContainer}>
              {CATEGORIES.map((mappedCategory) => (
                <TouchableOpacity
                  key={mappedCategory.id}
                  style={[
                    styles.categoryButton,
                    category?.id === mappedCategory.id && styles.selectedCategory
                  ]}
                  onPress={() => selectCategory(mappedCategory)}
                >
                  <Ionicons
                    name={mappedCategory.icon}
                    size={28}
                    color={mappedCategory.id === category?.id
                      ? (isDarkMode ? '#4080b0' : '#3498db')
                      : (isDarkMode ? '#cccccc' : '#666666')
                    }
                    style={styles.categoryIcon}
                  />
                  <Text style={styles.categoryName}>{mappedCategory.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Tipo Específico do Problema</Text>
            <TouchableOpacity
              style={styles.problemTypeButton}
              onPress={() => {
                if (category) {
                  setShowModal({ type: 'problem', visible: true });
                } else {
                  Alert.alert('Selecione uma Categoria', 'Por favor, selecione primeiro a categoria do problema.');
                }
              }}
            >
              <Text style={[
                styles.problemTypeText,
                !problemType && styles.placeholderText
              ]}>
                {problemType || 'Selecione o tipo específico do problema'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={isDarkMode ? '#cccccc' : '#666666'} />
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Nível de Importância</Text>
            <View style={styles.importanceLevelsContainer}>
              {IMPORTANCE_LEVELS.map((level) => {
                // Determine which badge style to use
                const badgeStyle = styles[`importanceBadge${level.id}`];

                return (
                  <TouchableOpacity
                    key={level.id}
                    style={[
                      styles.importanceButton,
                      importance?.id === level.id && styles.selectedImportance
                    ]}
                    onPress={() => setImportance(level)}
                  >
                    <View style={[styles.importanceBadge, badgeStyle]}>
                      <Text style={styles.badgeText}>{level.id}</Text>
                    </View>
                    <View>
                      <Text style={styles.importanceLevel}>
                        {level.name}
                      </Text>
                      <Text style={styles.importanceDescription}>
                        {level.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.sectionTitle}>Descrição Adicional (Opcional)</Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Descreva o problema com mais detalhes..."
              placeholderTextColor={isDarkMode ? '#808080' : '#999999'}
              multiline={true}
              value={description}
              onChangeText={setDescription}
              maxLength={300}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>Enviar Relato</Text>
                  <Ionicons name="send" size={20} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
        <>
          <ProblemModal />
          <SuccessModal />
        </>
      </View>
    </ContribuirLayout>
  );
}
