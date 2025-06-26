// MapScreen/style.js
import { StyleSheet, Platform } from "react-native";
import { colors, shadows, mapStyles } from "@/themes/index";

const getStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme === 'dark' ? colors.dark.pageBackground : colors.light.pageBackground,
    flex: 1,
  },
  map: {
    flex: 1,
  },
  // eslint-disable-next-line react-native/sort-styles
  icon: {
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? colors.dark.boxBackground : colors.light.boxBackground,
    borderColor: theme === 'dark' ? colors.dark.border : colors.light.border,
    borderRadius: 50,
    borderWidth: 2,
    height: 80,
    width: 80,
    // eslint-disable-next-line react-native/sort-styles
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
    right: 20,
    top: Platform.OS === 'ios' ? 50 : 30,
    ...(theme === 'dark' ? shadows.dark.full : shadows.light.full),
  },
  iconImage: {
    borderRadius: 15,
    height: 80,
    width: 80,
  },
  buttonContainer: {
    alignItems: 'center',
    bottom: 100,
    position: 'absolute',
    right: 16,
  },
  mapButton: {
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? colors.dark.boxBackground : colors.light.boxBackground,
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    marginBottom: 10,
    width: 50,
    ...(theme === 'dark' ? shadows.dark.full : shadows.light.full),
  },
  // Loading overlay
  loadingOverlay: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: theme === 'dark' 
      ? colors.dark.Overlaybackground
      : colors.light.Overlaybackground,
    borderRadius: 20,
    flexDirection: 'row',
    padding: 10,
    position: 'absolute',
    top: 20,
    ...(theme === 'dark' ? shadows.dark.full : shadows.light.full),
  },
  // Marker detail card
  markerDetailCard: {
    backgroundColor: theme === 'dark' ? colors.dark.boxBackground : colors.light.boxBackground,
    borderRadius: 10,
    bottom: 80,
    left: 20,
    padding: 15,
    position: 'absolute',
    right: 20,
    ...(theme === 'dark' ? shadows.dark.full : shadows.light.full),
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
  markerTitle: {
    color: theme === 'dark' ? colors.dark.text : colors.light.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  markerCategory: {
    color: theme === 'dark' ? mapStyles.colors.dark.marker_category : mapStyles.colors.light.marker_category,
    fontSize: 14,
    marginTop: 5,
  },
  markerDescription: {
    color: theme === 'dark' ? colors.dark.text : colors.light.text,
    fontSize: 14,
    marginTop: 10,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: colors.dark.border,
    borderRadius: 5,
    marginTop: 15,
    padding: 10,
  },
  actionButtonText: {
    color: theme === 'dark' ? colors.dark.text : colors.light.text,
  },
});

export default getStyles;