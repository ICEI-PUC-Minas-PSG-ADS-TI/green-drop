import { StyleSheet } from "react-native";
import { colors, shadows } from "@/themes/index";

const getStyles = (theme) => StyleSheet.create({
  // Layout containers
  container: {
    backgroundColor: colors[theme].pageBackground,
    flex: 1,
  },
  content: {
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },

  // Location info
  locationInfo: {
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? colors.custom.darkBg : colors.custom.lightAccent,
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
  },
  locationText: {
    color: theme === 'dark' ? colors.custom.grayMid : colors.custom.grayBorder,
    fontSize: 14,
    marginLeft: 8,
  },

  // Categories
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryButton: {
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? colors.custom.darkBg : colors.light.boxBackground,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: theme === 'dark' ? 0.3 : 0.1,
    shadowRadius: 2,
    width: '48%',
  },
  selectedCategory: {
    backgroundColor: theme === 'dark' ? colors.custom.darkAccent : colors.custom.lightAccent,
    borderColor: theme === 'dark' ? colors.custom.blueAccentDark : colors.custom.blueAccent,
    borderWidth: 2,
  },
  categoryIcon: {
    marginBottom: 8,
  },
  categoryName: {
    color: colors[theme].sectionTitle,
    fontSize: 14,
    textAlign: 'center',
  },

  // Problem types
  problemTypeButton: {
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? colors.custom.darkBg : colors.light.boxBackground,
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: theme === 'dark' ? 0.3 : 0.1,
    shadowRadius: 2,
  },
  problemTypeText: {
    color: colors[theme].sectionTitle,
    fontSize: 16,
  },

  // Importance levels
  importanceLevelsContainer: {
    marginBottom: 16,
  },
  importanceButton: {
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? colors.custom.darkBg : colors.light.boxBackground,
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    marginBottom: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: theme === 'dark' ? 0.3 : 0.1,
    shadowRadius: 2,
  },
  selectedImportance: {
    backgroundColor: theme === 'dark' ? colors.custom.darkAccent : colors.custom.lightAccent,
    borderColor: theme === 'dark' ? colors.custom.blueAccentDark : colors.custom.blueAccent,
    borderWidth: 2,
  },
  importanceBadge: {
    alignItems: 'center',
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    marginRight: 12,
    width: 24,
  },
  importanceBadge1: { backgroundColor: colors.badges.green1 },
  importanceBadge2: { backgroundColor: colors.badges.green2 },
  importanceBadge3: { backgroundColor: colors.badges.orange },
  importanceBadge4: { backgroundColor: colors.badges.redOrange },
  importanceBadge5: { backgroundColor: colors.badges.red },
  badgeText: {
    color: colors.badges.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  importanceLevel: {
    color: colors[theme].sectionTitle,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  importanceDescription: {
    color: theme === 'dark' ? colors.custom.grayDark : colors.custom.grayDarker,
    fontSize: 14,
  },

  // Description input
  descriptionInput: {
    backgroundColor: theme === 'dark' ? colors.custom.darkBg : colors.light.boxBackground,
    borderRadius: 8,
    color: colors[theme].sectionTitle,
    elevation: 2,
    height: 100,
    marginBottom: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: theme === 'dark' ? 0.3 : 0.1,
    shadowRadius: 2,
    textAlignVertical: 'top',
  },

  // Points
  pointsContainer: {
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? colors.custom.darkAccent : colors.custom.lightAccent,
    borderRadius: 12,
    marginBottom: 24,
    padding: 16,
    width: '100%',
  },
  pointsText: {
    color: colors[theme].sectionTitle,
    fontSize: 18,
    marginBottom: 8,
  },
  pointsValue: {
    color: theme === 'dark' ? colors.custom.blueAccentDark : colors.custom.blueAccent,
    fontSize: 36,
    fontWeight: 'bold',
  },
  pointsSubtext: {
    color: theme === 'dark' ? colors.custom.grayDark : colors.custom.grayDarker,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },

  // Buttons
  doneButton: {
    alignItems: 'center',
    backgroundColor: colors[theme].button,
    borderRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  doneButtonText: {
    color: colors[theme].buttonText,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: colors[theme].button,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  submitButtonText: {
    color: colors[theme].buttonText,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },

  // Modals
  modalContainer: {
    alignItems: 'center',
    backgroundColor: colors.custom.modalOverlay,
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: theme === 'dark' ? colors.custom.darkBg : colors.light.boxBackground,
    borderRadius: 12,
    maxHeight: '70%',
    padding: 20,
    width: '80%',
  },
  modalOption: {
    borderBottomColor: theme === 'dark' ? colors.custom.grayBorder : colors.custom.grayLight,
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  modalOptionText: {
    color: colors[theme].sectionTitle,
    fontSize: 16,
  },
  modalTitle: {
    color: colors[theme].sectionTitle,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  closeButtonText: {
    color: theme === 'dark' ? colors.dark.cancelButtonText : colors.light.cancelButtonText,
    fontWeight: 'bold',
  },

  // Success modal
  successModal: {
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? colors.custom.darkBg : colors.light.boxBackground,
    borderRadius: 16,
    padding: 24,
    width: '90%',
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    color: colors[theme].sectionTitle,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    color: theme === 'dark' ? colors.custom.grayMid : colors.custom.grayDark,
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },

  // Navigation/back button
  backButton: {
    backgroundColor: theme === 'dark' ? colors.dark.overlayBackground : colors.light.overlayBackground,
    borderRadius: 20,
    left: 16,
    padding: 8,
    position: 'absolute',
    top: 16,
    zIndex: 1,
  },
  photoPreview: {
    borderRadius: 12,
    height: 200,
    marginBottom: 20,
    width: '100%',
  },
  placeholderText: {
    color: theme === 'dark' ? colors.custom.grayDarker : colors.custom.grayDark,
  },
});

export default getStyles;