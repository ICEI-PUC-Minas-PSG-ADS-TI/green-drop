import { StyleSheet, Platform } from "react-native";
import { colors } from "@/themes/index";

const getStyles = (theme) =>
    StyleSheet.create({
        // ─── PAGE CONTAINER ─────────────────────────────────────────────
        container: {
            backgroundColor:
                theme === "dark"
                    ? colors.dark.pageBackground
                    : colors.light.pageBackground,
            flex: 1,
            padding: 16,
        },

        // ─── CARD BASE ─────────────────────────────────────────────────
        // eslint-disable-next-line react-native/sort-styles
        card: {
            alignItems: "center",
            backgroundColor:
                theme === "dark"
                    ? colors.dark.boxBackground
                    : colors.light.boxBackground,
            borderRadius: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
            padding: 12,
            // Sera sobrescrito dinamicamente no component
            ...Platform.select({
                ios: {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                },
                android: {
                    elevation: 3,
                },
            }),
        },

        // ─── SECTION 1: IMAGE ────────────────────────────────────────────
        section_1: {
            marginRight: 12,
        },
        photo: {
            backgroundColor: theme === "dark" ? colors.dark.placeholder : colors.light.placeholder,
            borderRadius: 6,
            height: 60,
            resizeMode: "cover",
            width: 60,
        },

        // ─── SECTION 2: TITLE + STATUS ──────────────────────────────────
        section_2: {
            flex: 1,
            justifyContent: "center",
        },
        nome: {
            color: theme === "dark" ? colors.dark.text : colors.light.text,
            fontSize: 16,
            fontWeight: "600",
        },
        status: {
            fontSize: 14,
            marginTop: 4,
        },

        // ─── SECTION 3: POINTS ──────────────────────────────────────────
        section_3: {
            alignItems: "flex-end",
            justifyContent: "center",
            minWidth: 50,
        },
        pontos: {
            color: theme === "dark" ? colors.dark.text : colors.light.text,
            fontSize: 14,
            fontWeight: "500",
        },

        // ─── EMPTY LIST MESSAGE ─────────────────────────────────────────
        emptyContainer: {
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            marginTop: 50,
            paddingHorizontal: 20,
        },
        emptyText: {
            color: theme === "dark" ? colors.dark.text : colors.light.text,
            fontSize: 14,
            marginTop: 8,
            textAlign: "center",
        },
    });

export default getStyles;