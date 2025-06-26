// ────────────────────────────────────────────────────────────────────────
// Main color palette for the app
export const colors = {
  dark: {
    // ─── MAIN PAGE / SCREEN BACKGROUNDS ────────────────────────────
    pageBackground: "#222831",         // Overall "page" background
    boxBackground: "#393E46",          // Secondary "box" backgrounds (e.g. cards, modals)
    background: "#30405d",             // Tertiary backgrounds (e.g. headers, footers)
    appBackground: "#121212",          // App container background
    surface: "#1F1F1F",                // Surface elements (headers, cards)
    
    // ─── TEXT COLORS ───────────────────────────────────────────────
    text: "#EEEEEE",                   // Default body text
    title: "#FFFFFF",                  // Primary headings
    subtitle: "#CCCCCC",               // Secondary headings / subtitles
    sectionTitle: "#E0E0E0",           // Section titles
    sectionDescription: "#BBBBBB",     // Section descriptions / hints
    textSecondary: "#AAAAAA",          // Secondary text (labels, captions)
    textTertiary: "#CCCCCC",           // Tertiary text (descriptions)

    // ─── BORDERS & ACCENTS ────────────────────────────────────────
    border: "#00ADB5",                 // Accent border (e.g. cards, inputs)
    sectionTitleBackground: "#00ADB5", // Accent background for section banners
    divider: "#333333",                // Dividers and borders
    
    // ─── ICONS & LINKS ────────────────────────────────────────────
    icon: "#EEEEEE",                   // Default icon color
    link: "#1E90FF",                   // Links color

    // ─── POINTS / BADGE TEXT ──────────────────────────────────────
    pointsText: "#FFD43B",             // Points/badge text
    locked: "#333333" ,                // Locked badge
    bronze: "#CD7F32" ,                // Bronze badge
    silver: "#C0C0C0" ,                // Silver badge
    gold: "#FFD700" ,                  // Gold badge

    // ─── OVERLAYS & MODALS ───────────────────────────────────────
    overlayBackground: "rgba(57, 62, 70, 0.8)",   // Overlay background
    modalOverlay: "rgba(0,0,0,0.5)",              // Modal Overlay background
    
    // ─── FORM / INPUT FIELDS ─────────────────────────────────────
    inputBorder: "#CCCCCC",            // Input borders
    
    // ─── CAMERA / MEDIA CONTROLS ─────────────────────────────────
    cameraContainer: "#1A1A1A",        // Camera container
    buttonContainer: "#1E1E1E",        // Button container
    
    // ─── BUTTONS ─────────────────────────────────────────────────
    button: "#204050",                 // Primary buttons
    buttonText: "#FFFFFF",             // Button text
    disabledButton: "#444444",         // Disabled buttons
    disabledButtonText: "#AAAAAA",     // Disabled button text
    cancelButton: "#333333",           // Cancel buttons
    cancelButtonText: "#CCCCCC",       // Cancel button text
    
    // ─── LOADING STATES ───────────────────────────────────────────
    loading: "#121212",                // Loading background
    loadingText: "#E0E0E0",            // Loading text
    
    // ─── LOCATION OVERLAY ─────────────────────────────────────────
    locationContainer: "rgba(30,30,30,0.9)", // Location container
    locationBorder: "rgba(255,255,255,0.1)", // Location border
    locationText: "#FFFFFF",                   // Location text
    locationIcon: "#EEEEEE",                   // Location icons
    
    // ─── PLACEHOLDERS ─────────────────────────────────────────────
    placeholder: "#CCCCCC",             // Placeholders
    
    // ─── DIVIDERS & TOP BORDERS ──────────────────────────────────
    borderTop: "#333333",               // Top borders

    // ─── General STATUS COLORS ─────────────────────────────────────
    Pending: "#9191b9",
    Complete: "#00ADB5",

    // ─── REPORT STATUS COLORS ─────────────────────────────────────
    statusColors: {
      Pending:   { card: "#FFC107", text: "#000000" }, // Amarelo
      Accepted:  { card: "#28A745", text: "#FFFFFF" }, // Verde
      Rejected:  { card: "#DC3545", text: "#FFFFFF" }, // Vermelho
      default:   { card: "#888888", text: "#FFFFFF" }, // Cinza
    },
    // ─── SCREEN CONTAINER ─────────────────────────────────────────
    containerBackground: "#121212",     // antigo '#121212' na raiz do screen

    // ─── SECTION TITLE (SCREEN) ──────────────────────────────────
    sectionHeaderText: "#E0E0E0",       // antigo '#e0e0e0'

    // ─── LOCATION ROW ────────────────────────────────────────────
    locationInfoBackground: "#1E2132",  // antigo '#1e2132'
    locationInfoText: "#CCCCCC",         // antigo '#cccccc'

    // ─── CATEGORY & PROBLEM BUTTONS ─────────────────────────────
    categoryButtonBackground: "#1E2132", // antigo '#1e2132'
    selectedCategoryBackground: "#304050",// antigo '#304050'
    selectedCategoryBorderColor: "#4080B0", // antigo '#4080b0'
    categoryNameText: "#E0E0E0",          // antigo '#e0e0e0'

    // ─── PLACEHOLDER ─────────────────────────────────────────────
    placeholderText: "#808080",          // antigo '#808080'

    // ─── IMPORTANCE DESCRIPTION ──────────────────────────────────
    importanceDescriptionText: "#AAAAAA", // antigo '#aaaaaa'

    // ─── IMPORTANCE BADGES ───────────────────────────────────────
    importanceBadge1: "#90EE90",         // Verde claro
    importanceBadge2: "#98FB98",         // Verde mais claro
    importanceBadge3: "#FFA500",         // Laranja
    importanceBadge4: "#FF6347",         // Vermelho‑laranja
    importanceBadge5: "#FF4500",         // Vermelho

    // ─── MODAL DIVIDER ──────────────────────────────────────────
    modalDividerColor: "#333333",        // antigo '#333333'

    // ─── SUCCESS MESSAGE ────────────────────────────────────────
    successMessageText: "#CCCCCC",       // antigo '#cccccc'

    // ─── POINTS VALUE ───────────────────────────────────────────
    pointsValueColor: "#4080B0",         // antigo '#4080b0'

    // ─── BACK BUTTON OVERLAY ────────────────────────────────────
    backButtonBackground: "rgba(30,30,30,0.8)", // antigo rgba(30,30,30,0.8)
  },
  light: {
    // ─── MAIN PAGE / SCREEN BACKGROUNDS ────────────────────────────
    pageBackground: "#E9F5E9",          // Overall "page" background
    boxBackground: "#FFFFFF",           // Secondary "box" backgrounds
    background: "#FFFFFF",              // Tertiary backgrounds
    appBackground: "#F5F5F5",           // App container background
    surface: "#FFFFFF",                 // Surface elements (headers, cards)
    
    // ─── TEXT COLORS ───────────────────────────────────────────────
    text: "#222831",                    // Default body text
    title: "#333333",                   // Primary headings
    subtitle: "#666666",                // Secondary headings / subtitles
    sectionTitle: "#444444",            // Section titles
    sectionDescription: "#555555",      // Section descriptions / hints
    textSecondary: "#666666",           // Secondary text (labels, captions)
    textTertiary: "#666666",            // Tertiary text (descriptions)

    // ─── BORDERS & ACCENTS ────────────────────────────────────────
    border: "#00ADB5",                  // Accent border
    sectionTitleBackground: "#00ADB5",  // Section banner background
    divider: "#EEEEEE",                 // Dividers and borders
    
    // ─── ICONS & LINKS ────────────────────────────────────────────
    icon: "#222831",                    // Default icon color
    link: "#1E90FF",                    // Links color

    // ─── POINTS / BADGE TEXT ──────────────────────────────────────
    pointsText: "#FFAA00",              // Points/badge text
    locked: "#333333" ,                // Locked badge
    bronze: "#CD7F32" ,                // Bronze badge
    silver: "#C0C0C0" ,                // Silver badge
    gold: "#FFD700" ,                  // Gold badge

    // ─── OVERLAYS & MODALS ───────────────────────────────────────
    overlayBackground: "rgba(255, 255, 255, 0.8)", // Overlay background
    modalOverlay: "rgba(0,0,0,0.5)",               // Modal Overlay background
    
    // ─── FORM / INPUT FIELDS ─────────────────────────────────────
    inputBorder: "#333333",             // Input borders
    
    // ─── CAMERA / MEDIA CONTROLS ─────────────────────────────────
    cameraContainer: "#F0F0F0",         // Camera container
    buttonContainer: "#F2F2F2",         // Button container
    
    // ─── BUTTONS ─────────────────────────────────────────────────
    button: "#3498DB",                  // Primary buttons
    buttonText: "#FFFFFF",              // Button text
    disabledButton: "#CCCCCC",          // Disabled buttons
    disabledButtonText: "#888888",      // Disabled button text
    cancelButton: "#E0E0E0",            // Cancel buttons
    cancelButtonText: "#333333",        // Cancel button text
    
    // ─── LOADING STATES ───────────────────────────────────────────
    loading: "#F8F8F8",                 // Loading background
    loadingText: "#333333",             // Loading text
    
    // ─── LOCATION OVERLAY ─────────────────────────────────────────
    locationContainer: "rgba(255, 255, 255, 0.9)",  // Location container
    locationBorder: "rgba(0, 0, 0, 0.05)",          // Location border
    locationText: "#000000",                          // Location text
    locationIcon: "#222831",                          // Location icons
    
    // ─── PLACEHOLDERS ─────────────────────────────────────────────
    placeholder: "#CCCCCC",             // Placeholders
    
    // ─── DIVIDERS & TOP BORDERS ──────────────────────────────────
    borderTop: "#DDDDDD",               // Top borders

    // ─── General STATUS COLORS ─────────────────────────────────────
    Pending: "#9191b9",
    Complete: "#00ADB5",
    
    // ─── REPORT STATUS COLORS ─────────────────────────────────────
    statusColors: {
      Pending:   { card: "#FFC107", text: "#000000" }, // Amarelo
      Accepted:  { card: "#28A745", text: "#FFFFFF" }, // Verde
      Rejected:  { card: "#DC3545", text: "#FFFFFF" }, // Vermelho
      default:   { card: "#888888", text: "#FFFFFF" }, // Cinza
    },
    // ─── SCREEN CONTAINER ─────────────────────────────────────────
    containerBackground: "#f8f8f8",     // antigo '#f8f8f8'

    // ─── SECTION TITLE (SCREEN) ──────────────────────────────────
    sectionHeaderText: "#333333",       // antigo '#333333'

    // ─── LOCATION ROW ────────────────────────────────────────────
    locationInfoBackground: "#E6F0F5",  // antigo '#e6f0f5'
    locationInfoText: "#333333",         // antigo '#333333'

    // ─── CATEGORY & PROBLEM BUTTONS ─────────────────────────────
    categoryButtonBackground: "#FFFFFF", // antigo '#ffffff'
    selectedCategoryBackground: "#E6F0FA",// antigo '#e6f0fa'
    selectedCategoryBorderColor: "#3498DB",// antigo '#3498db'
    categoryNameText: "#333333",          // antigo '#333333'

    // ─── PLACEHOLDER ─────────────────────────────────────────────
    placeholderText: "#999999",          // antigo '#999999'

    // ─── IMPORTANCE DESCRIPTION ──────────────────────────────────
    importanceDescriptionText: "#777777", // antigo '#777777'

    // ─── IMPORTANCE BADGES ───────────────────────────────────────
    importanceBadge1: "#90EE90",
    importanceBadge2: "#98FB98",
    importanceBadge3: "#FFA500",
    importanceBadge4: "#FF6347",
    importanceBadge5: "#FF4500",

    // ─── MODAL DIVIDER ──────────────────────────────────────────
    modalDividerColor: "#F0F0F0",        // antigo '#f0f0f0'

    // ─── SUCCESS MESSAGE ────────────────────────────────────────
    successMessageText: "#666666",       // antigo '#666666'

    // ─── POINTS VALUE ───────────────────────────────────────────
    pointsValueColor: "#3498DB",         // antigo '#3498db'

    // ─── BACK BUTTON OVERLAY ────────────────────────────────────
    backButtonBackground: "rgba(240,240,240,0.8)", // antigo rgba(240,240,240,0.8)
  },
};

// ────────────────────────────────────────────────────────────────────────
// Bottom bar (tab bar) colors
export const bottomBarColors = {
  dark: {
    background: colors.dark.background,  // "#30405d"
    border: colors.dark.border,          // "#00ADB5"
    text: colors.dark.text,              // "#EEEEEE"
    icon: colors.dark.icon,              // "#EEEEEE"
  },
  light: {
    background: colors.light.background,  // "#FFFFFF"
    border: colors.light.border,          // "#00ADB5"
    text: colors.light.text,              // "#222831"
    icon: colors.light.icon,              // "#222831"
  },
};

// ────────────────────────────────────────────────────────────────────────
// Camera-specific colors
export const cameraColors = {
  dark: {
    cameraContainer: "#000000",             // full-screen behind camera preview
    buttonContainer: colors.dark.buttonContainer,   // "#1E1E1E"
    borderTop: colors.dark.borderTop,               // "#333333"

    controlButton: "rgba(0, 0, 0, 0.6)",     // semi-opaque black 
    previewButton: "rgba(0, 0, 0, 0.7)",     // semi-opaque black
    previewBorder: "rgba(255, 255, 255, 0.3)", // light border around preview
    previewButtonText: "#FFFFFF",             // white text on preview button

    shutterButton: "rgba(255, 255, 255, 0.3)", // semi-opaque white for inner and outer separation
    shutterInner: "#FFFFFF",        // white inner and outer circle for shutter button

    loading: colors.dark.loading,            // "#121212"
    loadingOverlay: "rgba(0, 0, 0, 0.5)",   // semi-opaque black overlay
    loadingText: "#FFFFFF",               // white text for loading state
  },
  light: {
    cameraContainer: "#000000",              // full-screen behind camera preview
    buttonContainer: colors.light.buttonContainer, // "#F2F2F2"
    borderTop: colors.light.borderTop,       // "#DDDDDD"

    controlButton: "rgba(0, 0, 0, 0.6)", // semi-opaque black
    previewButton: "rgba(0, 0, 0, 0.7)",  // semi-opaque black
    previewBorder: "rgba(255, 255, 255, 0.3)",  // light border around preview
    previewButtonText: "#FFFFFF",   // white text on preview button

    shutterButton: "rgba(255, 255, 255, 0.3)",  // semi-opaque white for inner and outer separation
    shutterInner: "#FFFFFF",   // white inner and outer circle for shutter button

    buttonText: "#FFFFFF",                   // white text on buttons (e.g. for camera UI labels)
    loading: colors.light.loading,           // "#F8F8F8"
    loadingOverlay: "rgba(0, 0, 0, 0.5)",   // semi-opaque black overlay
    loadingText: "#000000",                 // black text for loading state
  },
};

// ────────────────────────────────────────────────────────────────────────
// Progress-header (step indicators) colors
export const progressHeaderColors = {
  dark: {
    background: colors.dark.background,       // "#30405d"
    text: colors.dark.text,                   // "#EEEEEE"
    border: colors.dark.border,               // "#00ADB5"
    activeIcon: colors.dark.border,           // "#00ADB5"
    inactiveIcon: colors.dark.boxBackground,  // "#393E46"
    activeText: colors.dark.text,             // "#EEEEEE"
    inactiveText: colors.dark.text,           // "#EEEEEE"
  },
  light: {
    background: colors.light.background,      // "#FFFFFF"
    text: colors.light.text,                  // "#222831"
    border: colors.light.border,              // "#00ADB5"
    activeIcon: colors.light.border,          // "#00ADB5"
    inactiveIcon: colors.light.pageBackground,// "#E9F5E9"
    activeText: colors.light.title,           // "#333333"
    inactiveText: colors.light.text,          // "#222831"
  },
};

// ────────────────────────────────────────────────────────────────────────
// Shadows
export const shadows = {
  dark: {
    full: {
      shadowColor: "#FFFFFF",            // white shadow on dark
      shadowOffset: { width: 0, height: 2 },  // offset for shadow
      shadowOpacity: 0.2,   // opacity of shadow
      shadowRadius: 3.84,   // radius of shadow
      elevation: 5,   // elevation for Android
    },
    top: {
      shadowColor: "#000000",            // black shadow at top
      shadowOffset: { width: 0, height: -2 },   // offset for top shadow
      shadowOpacity: 0.3,             // opacity of top shadow
      shadowRadius: 4,                // radius of top shadow
      elevation: 6,                   // elevation for Android
    },
    text: {
      textShadowColor: "rgba(0,0,0,0.75)",    // dark text shadow
      textShadowOffset: { width: -3, height: 4 },   // offset for text shadow
      textShadowRadius: 7,              // radius of text shadow
    },
  },
  light: {
    full: {
      shadowColor: "#000000",            // black shadow on light
      shadowOffset: { width: 0, height: 2 },    // offset for shadow
      shadowOpacity: 0.25,              // opacity of shadow
      shadowRadius: 3.84,               // radius of shadow
      elevation: 5,                     // elevation for Android
    },
    top: {
      shadowColor: "#000000",           // black shadow at top
      shadowOffset: { width: 0, height: -2 }, // offset for top shadow
      shadowOpacity: 0.3,         // opacity of top shadow    
      shadowRadius: 4,                // radius of top shadow
      elevation: 6,                     // elevation for Android
    },
    text: {
      textShadowColor: "rgba(0,0,0,0.75)",    // dark text shadow
      textShadowOffset: { width: -3, height: 4 },   // offset for text shadow
      textShadowRadius: 7,              // radius of text shadow
    },
  },
};

// ────────────────────────────────────────────────────────────────────────
// Map styles & colors
export const mapStyles = {
  items: {        // Map style presets
    dark: [
      {
        stylers: [
          { hue: "#ff1a00" },
          { invert_lightness: true },
          { saturation: -100 },
          { lightness: 33 },
          { gamma: 0.5 },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#2D333C" }],
      },
    ],
    light: [], // use default map style for light theme
  },
  colors: {     // Map marker colors
    dark: {
      marker_category: "rgba(238, 238, 238, 0.7)",
    },
    light: {
      marker_category: "rgba(34, 40, 49, 0.7)",
    },
  },
};
