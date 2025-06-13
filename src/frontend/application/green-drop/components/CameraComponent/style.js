/* eslint-disable react-native/sort-styles */
import { StyleSheet } from "react-native";
import { cameraColors, shadows } from "@/themes/index";

const getStyles = (theme) => {
  const isDarkMode = theme === 'dark';
  
  return StyleSheet.create({
    // ─── CAMERA STYLES ──────────────────────────────────────────────
    //#region Camera Styles
    // ─── PAGE CONTAINER ─────────────────────────────────────────────
    container: {
      backgroundColor: isDarkMode ? cameraColors.dark.cameraContainer : cameraColors.light.cameraContainer,
      borderRadius: 8,
      flex: 1,
      height: '100%',
      overflow: 'hidden',
      width: '100%',
    },

    // ─── CAMERA VIEW ────────────────────────────────────────────────
    camera: { 
      borderRadius: 8,
      flex: 1,
      height: '100%',
      overflow: 'hidden',
      width: '100%', 
    },

    // ─── BUTTONS ────────────────────────────────────────────────────
    //#region Buttons
    controlButton: {
      alignItems: 'center',
      backgroundColor: isDarkMode ? cameraColors.dark.button : cameraColors.light.button,
      borderRadius: 20,
      height: 40,
      justifyContent: 'center',
      marginBottom: 12,
      width: 40,
    },
    
    controls: {
      alignItems: 'center',
      bottom: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
    },
    
    shutterButton: {
      alignItems: 'center',
      backgroundColor: isDarkMode ? cameraColors.dark.shutterButton : cameraColors.light.shutterButton,
      borderColor: isDarkMode ? cameraColors.dark.shutterInner : cameraColors.light.shutterInner,
      borderRadius: 36,
      borderWidth: 4,
      height: 72,
      justifyContent: 'center',
      width: 72,
    },
    
    shutterInner: {
      backgroundColor: isDarkMode ? cameraColors.dark.shutterInner : cameraColors.light.shutterInner,
      borderRadius: 28,
      height: 56,
      width: 56,
    },
    
    sideControls: {
      position: 'absolute',
      right: 20,
      top: 20,
      zIndex: 10,
    },
    //#endregion
    // ─── LOADING ─────────────────────────────────────────────────────
    //#region Loading
    loading: {
      alignItems: 'center',
      backgroundColor: isDarkMode ? cameraColors.dark.loading : cameraColors.light.loading,
      flex: 1,
      justifyContent: 'center',
    },
    
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      backgroundColor: isDarkMode ? cameraColors.dark.loadingOverlay : cameraColors.light.loadingOverlay,
      justifyContent: 'center',
    },
    
    loadingText: {
      color: isDarkMode ? cameraColors.dark.loadingText : cameraColors.light.loadingText,
      fontSize: 16,
      marginTop: 16,
    },
    //#endregion
    //#endregion
    // ─── PREVIEW ─────────────────────────────────────────────────────
    //#region Preview
    // ─── Preview Buttons ──────────────────────────────────────────────
    //#region Preview Buttons
    previewButton: {
      alignItems: 'center',
      backgroundColor: isDarkMode ? cameraColors.dark.previewButton : cameraColors.light.previewButton,
      borderColor: isDarkMode ? cameraColors.dark.previewBorder : cameraColors.light.previewBorder,
      borderRadius: 30,
      borderWidth: 1,
      elevation: 3,
      flexDirection: 'row',
      margin: 10,
      paddingHorizontal: 20,
      paddingVertical: 12,
      shadowColor: isDarkMode ? shadows.dark.top.shadowColor : shadows.light.top.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    
    previewButtonText: {
      color: isDarkMode ? cameraColors.dark.previewButtonText : cameraColors.light.previewButtonText,
      fontWeight: 'bold',
      marginLeft: 8,
    },
    
    previewControls: {
      bottom: 30,
      flexDirection: 'row',
      justifyContent: 'space-around',
      left: 0,
      paddingHorizontal: 20,
      position: 'absolute',
      right: 0,
    },
    //#endregion
    // ─── Preview Container ────────────────────────────────────────────
    previewContainer: {
      backgroundColor: isDarkMode ? cameraColors.dark.cameraContainer : cameraColors.light.cameraContainer,
      borderRadius: 8,
      flex: 1,
      height: '100%',
      overflow: 'hidden',
      width: '100%',
    },
    // ─── Preview Image ────────────────────────────────────────────────
    previewImage: {
      flex: 1,
      height: '100%',
      width: '100%',
    },
    //#endregion
  });
};

export default getStyles;