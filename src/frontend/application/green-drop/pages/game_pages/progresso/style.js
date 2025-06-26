/* eslint-disable react-native/sort-styles */
import { StyleSheet } from "react-native";
import { colors, shadows } from "@/themes/index";

const getStyles = (theme) => {
  const T = colors[theme];
  const S = shadows[theme];
  return StyleSheet.create({
    container: {
      backgroundColor: T.pageBackground,
      flex: 1,
    },
    contentContainer: {
      padding: 15,
    },
    header: {
      alignItems: "center",
      backgroundColor: T.surface,
      borderBottomColor: T.divider,
      borderBottomWidth: 1,
      justifyContent: 'space-between',
      padding: 12,
      flexDirection: 'row',
    },
    headerTitle: {
      color: T.title,
      fontSize: 18,
      fontWeight: "bold",
    },
    // ─── ABAS ────────────────────────────────────────
    tabsContainer: {
      backgroundColor: T.background,
      borderBottomColor: T.divider,
      borderBottomWidth: 1,
      flexDirection: "row",
    },
    tabButtonActive: {
      alignItems: "center",
      backgroundColor: T.border,
      flex: 1,
      padding: 12,
    },
    tabButtonInactive: {
      alignItems: "center",
      backgroundColor: T.surface,
      flex: 1,
      padding: 12,
    },
    tabTextActive: {
      color: T.buttonText,
      fontWeight: "bold",
    },
    tabTextInactive: {
      color: T.textSecondary,
    },
    tab: {
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      padding: 15,
    },
    tabIcon: {
      color: T.textSecondary,
      marginRight: 8,
    },
    tabText: {
      color: T.title,
      fontSize: 16,
      fontWeight: "500",
    },
    // ─── CARTÕES DE REPORT ────────────────────────────
    card: {
      backgroundColor: T.surface,
      borderRadius: 10,
      elevation: 2,
      margin: 8,
      padding: 12,
      shadowColor: S.top.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    thumbnail: {
      width: 60,
      height: 60,
      borderRadius: 8,
      marginRight: 12,
      backgroundColor: T.divider,
    },
    infoContainer: {
      flex: 1,
    },
    badge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      marginBottom: 4,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '600',
    },
    cardTitle: {
       color: T.title,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    cardText: {
      color: T.textTertiary,
      fontSize: 14,
      marginBottom: 4,
    },
    cardHeader: {
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 5,
    },
    relevanceText: {
      fontSize: 12,
      fontStyle: 'italic',
    },
    footer: {
      marginTop: 8,
      alignItems: 'flex-end',
    },
    statusText: {
      fontSize: 14,
      fontWeight: '600',
    },

   // ─── ESTADOS Completo ──────────────────────────────
   completoText: {
    color: T.Complete,
    fontSize: 14,
    fontWeight: "600",
   },
   
   // ─── ESTADOS PENDENTE (optional) ────────────────────
   pendenteText: {
     color: T.Pending,
     fontStyle: "italic",
   },
   // ─── ÍCONES / MEDALHAS ─────────────────────────────
   medalIcon: {
    marginRight: 10,
     color: T.gold,
    },
   medalIconDisabled: {
    marginRight: 10,
     color: T.locked,
   },
    trophyIcon: {
      color: T.pointsText,
      marginBottom: 5,
    },

    // ─── Nivel ─────────────────────────────
    nivelContainer: {
       alignItems: "center",
     },
    nivelLabel: {
      color: T.title,
      fontSize: 24,
      fontWeight: "bold",
    },
    proximoNivel: {
      color: T.textSecondary,
      fontSize: 12,
    },

    // ─── Pontos ─────────────────────────────
    pontosContainer: {
      alignItems: "center",
    },
    pontosLabel: {
      color: T.textSecondary,
      fontSize: 16,
    },
    pontosValor: {
      color: T.title,
      fontSize: 36,
      fontWeight: "bold",
      marginTop: 5,
    },
    // ─── Barra de progresso ─────────────────────────────
    progressoBar: {
      backgroundColor: T.divider,
      borderRadius: 4,
      height: 8,
      marginVertical: 5,
      overflow: "hidden",
      width: 150,
    },
    progressoFill: {
      backgroundColor: T.border,
      height: "100%",
    },
    progressContainer: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    progressoText: {
      color: T.link,
      fontWeight: "600",
    },
  });
};

export default getStyles;