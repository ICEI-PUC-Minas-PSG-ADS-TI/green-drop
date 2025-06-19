/* eslint-disable react-native/sort-styles */
import { StyleSheet } from "react-native";
import { colors, shadows } from "@/themes/index";

const getStyles = (theme) => {
  const T = colors[theme];
  const S = shadows[theme];

  return StyleSheet.create({
    container: {
      backgroundColor: T.containerBackground,
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    content: {
      padding: 16,
    },

    sectionTitle: {
      color: T.sectionHeaderText,
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 12,
      marginTop: 20,
    },

    photoPreview: {
      borderRadius: 12,
      height: 200,
      marginBottom: 20,
      width: "100%",
    },

    locationInfo: {
      alignItems: "center",
      backgroundColor: T.locationInfoBackground,
      borderRadius: 8,
      flexDirection: "row",
      marginBottom: 20,
      padding: 10,
    },
    locationText: {
      color: T.locationInfoText,
      fontSize: 14,
      marginLeft: 8,
    },

    categoriesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    categoryButton: {
      alignItems: "center",
      backgroundColor: T.categoryButtonBackground,
      borderRadius: 10,
      elevation: 2,
      marginBottom: 10,
      padding: 16,
      shadowColor: S.top.shadowColor,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: S.top.shadowOpacity,
      shadowRadius: 2,
      width: "48%",
    },
    selectedCategory: {
      backgroundColor: T.selectedCategoryBackground,
      borderColor: T.selectedCategoryBorderColor,
      borderWidth: 2,
    },
    categoryIcon: {
      marginBottom: 8,
    },
    categoryName: {
      color: T.categoryNameText,
      fontSize: 14,
      textAlign: "center",
    },

    problemTypeButton: {
      alignItems: "center",
      backgroundColor: T.categoryButtonBackground,
      borderRadius: 8,
      elevation: 2,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
      padding: 16,
      shadowColor: S.top.shadowColor,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: S.top.shadowOpacity,
      shadowRadius: 2,
    },
    problemTypeText: {
      color: T.categoryNameText,
      fontSize: 16,
    },

    placeholderText: {
      color: T.placeholderText,
    },

    importanceLevelsContainer: {
      marginBottom: 16,
    },
    importanceButton: {
      alignItems: "center",
      backgroundColor: T.categoryButtonBackground,
      borderRadius: 8,
      elevation: 2,
      flexDirection: "row",
      marginBottom: 8,
      padding: 12,
      shadowColor: S.top.shadowColor,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: S.top.shadowOpacity,
      shadowRadius: 2,
    },
    selectedImportance: {
      backgroundColor: T.selectedCategoryBackground,
      borderColor: T.selectedCategoryBorderColor,
      borderWidth: 2,
    },
    importanceLevel: {
      color: T.categoryNameText,
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 4,
    },
    importanceDescription: {
      color: T.importanceDescriptionText,
      fontSize: 14,
    },

    importanceBadge: {
      alignItems: "center",
      borderRadius: 12,
      height: 24,
      justifyContent: "center",
      marginRight: 12,
      width: 24,
    },
    importanceBadge1: { backgroundColor: T.importanceBadge1 },
    importanceBadge2: { backgroundColor: T.importanceBadge2 },
    importanceBadge3: { backgroundColor: T.importanceBadge3 },
    importanceBadge4: { backgroundColor: T.importanceBadge4 },
    importanceBadge5: { backgroundColor: T.importanceBadge5 },
    badgeText: {
      color: colors[theme].buttonText,
      fontSize: 14,
      fontWeight: "bold",
    },

    descriptionInput: {
      backgroundColor: T.categoryButtonBackground,
      borderRadius: 8,
      color: T.categoryNameText,
      elevation: 2,
      height: 100,
      marginBottom: 20,
      padding: 12,
      shadowColor: S.top.shadowColor,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: S.top.shadowOpacity,
      shadowRadius: 2,
      textAlignVertical: "top",
    },

    submitButton: {
      alignItems: "center",
      backgroundColor: colors[theme].button,
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: "center",
      padding: 10,
    },
    submitButtonText: {
      color: colors[theme].buttonText,
      fontSize: 16,
      fontWeight: "bold",
      marginRight: 8,
    },

    modalContainer: {
      alignItems: "center",
      backgroundColor: T.modalOverlay,
      flex: 1,
      justifyContent: "center",
    },
    modalContent: {
      backgroundColor: T.categoryButtonBackground,
      borderRadius: 12,
      maxHeight: "70%",
      padding: 20,
      width: "80%",
    },
    modalTitle: {
      color: T.categoryNameText,
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
    },
    modalOption: {
      borderBottomColor: T.modalDividerColor,
      borderBottomWidth: 1,
      paddingVertical: 12,
    },
    modalOptionText: {
      color: T.categoryNameText,
      fontSize: 16,
    },
    closeButton: {
      alignItems: "center",
      backgroundColor: T.cancelButton,
      borderRadius: 8,
      marginTop: 16,
      padding: 12,
    },
    closeButtonText: {
      color: T.categoryNameText,
      fontWeight: "bold",
    },

    successModal: {
      alignItems: "center",
      backgroundColor: T.categoryButtonBackground,
      borderRadius: 16,
      padding: 24,
      width: "90%",
    },
    successIcon: {
      marginBottom: 16,
    },
    successTitle: {
      color: T.categoryNameText,
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 8,
      textAlign: "center",
    },
    successMessage: {
      color: T.successMessageText,
      fontSize: 16,
      marginBottom: 24,
      textAlign: "center",
    },

    pointsContainer: {
      alignItems: "center",
      backgroundColor: T.selectedCategoryBackground,
      borderRadius: 12,
      marginBottom: 24,
      padding: 16,
      width: "100%",
    },
    pointsText: {
      color: T.categoryNameText,
      fontSize: 18,
      marginBottom: 8,
    },
    pointsValue: {
      color: T.pointsValueColor,
      fontSize: 36,
      fontWeight: "bold",
    },
    pointsSubtext: {
      color: T.importanceDescriptionText,
      fontSize: 14,
      marginTop: 8,
      textAlign: "center",
    },

    doneButton: {
      alignItems: "center",
      backgroundColor: colors[theme].button,
      borderRadius: 8,
      flexDirection: "row",
      paddingHorizontal: 32,
      paddingVertical: 12,
    },
    doneButtonText: {
      color: colors[theme].buttonText,
      fontSize: 16,
      fontWeight: "bold",
      marginRight: 8,
    },

    backButton: {
      backgroundColor: T.backButtonBackground,
      borderRadius: 20,
      left: 16,
      padding: 8,
      position: "absolute",
      top: 16,
      zIndex: 1,
    },
  });
};

export default getStyles;
