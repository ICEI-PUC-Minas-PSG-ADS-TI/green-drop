import { StyleSheet } from "react-native";
import { colors, shadows } from "@/themes/index";

const getStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: colors[theme].pageBackground,
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    color: theme=='dark'? colors.dark.title : colors.light.title,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: theme=='dark' ? colors.dark.subtitle : colors.light.subtitle,
    fontSize: 16,
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: theme=='dark' ? colors.dark.sectionTitle : colors.light.sectionTitle,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: theme=='dark' ? colors.dark.sectionDescription : colors.light.sectionDescription,
    marginBottom: 16,
  },
  pointCard: {
    backgroundColor: theme=='dark' ? '#1e2132' : '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme=='dark' ? 0.3 : 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme=='dark' ? '#e0e0e0' : '#333333',
    marginBottom: 8,
  },
  pointRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  pointText: {
    fontSize: 14,
    color: theme=='dark' ? '#cccccc' : '#555555',
  },
  pointValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme=='dark' ? '#80e080' : '#208020',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  nextButton: {
    backgroundColor: theme=='dark' ? '#204050' : '#3498db',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  loadingText: {
    textAlign: 'center',
    margin: 20,
    color: theme=='dark' ? '#cccccc' : '#666666',
  }
});

export default getStyles;