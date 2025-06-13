import React from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
// Em caso de usar navegação, descomente a linha abaixo:
// import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../contexts";
import getStyles from "./style";

const SAMPLE_REPORTS = [
    {
        id: 1,
        title: "Sample Report",
        status: "Pending",
        points: 10,
        photo: {
            uri: "https://picsum.photos/200/200",
            location: { latitude: 0, longitude: 0 },
        },
    },
    {
        id: 2,
        title: "Another Report",
        status: "Accepted",
        points: 20,
        photo: {
            uri: "https://picsum.photos/id/237/200/200",
            location: { latitude: 0, longitude: 0 },
        },
    },
    {
        id: 3,
        title: "Third Report",
        status: "Rejected",
        points: 5,
        photo: {
            uri: "https://picsum.photos/id/297/200/200",
            location: { latitude: 0, longitude: 0 },
        },
    },
];

function ReportItem({ item, styles, onPress }) {
    let cardColor;
    let textColor;
    switch (item.status) {
        case "Pending":
            // A bright amber that pops on both dark (#222831) and light (#E9F5E9)
            cardColor = "#FFC107";
            // Yellow is light enough that pure black text has excellent contrast.
            textColor = "#000000";
            break;

        case "Accepted":
            // A rich “success” green that reads well on both dark and light
            cardColor = "#28A745";
            // #28A745 is a mid-dark green, so white text is needed for legibility.
            textColor = "#FFFFFF";
            break;

        case "Rejected":
            // A strong, attention-grabbing red
            cardColor = "#DC3545";
            // #DC3545 is also on the darker side—white text works best.
            textColor = "#FFFFFF";
            break;

        default:
            console.warn(`Status desconhecido: ${item.status}`);
            // Fallback: neutral gray card, white text for legibility on both themes
            cardColor = "#888888";
            textColor = "#FFFFFF";
    }

    // Use TouchableOpacity only if onPress is provided:
    const Container = onPress ? TouchableOpacity : View;
    const containerProps = onPress ? { onPress: () => onPress(item) } : {};

    return (
        <Container style={[styles.card, { backgroundColor: cardColor }]} {...containerProps}>
            <View style={styles.section_1}>
                <Image source={{ uri: item.photo.uri }} style={styles.photo} />
            </View>
            <View style={styles.section_2}>
                <Text style={[styles.nome, { color: textColor }]}>{item.title}</Text>
                <Text style={[styles.status, { color: textColor }]}>{item.status}</Text>
            </View>
            <View style={styles.section_3}>
                <Text style={[styles.pontos, { color: textColor }]}>{item.points} pontos</Text>
            </View>
        </Container>
    );
}

export default function ReportHistory() {
    const { colorScheme } = ThemeContext.useTheme();
    const styles = getStyles(colorScheme);

    // Possivel uso futuro para navegação:
    // const navigation = useNavigation();
    /* const handleItemPress = (item) => {    
      console.log("Clicked report:", item.id);
    }; */

    const reportData = SAMPLE_REPORTS;

    return (
        <View style={styles.container}>
            <FlatList
                data={reportData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ReportItem
                        item={item}
                        styles={styles}
                    // Possivel uso futuro para navegação:
                    // onPress={handleItemPress}
                    />
                )}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nenhum reporte encontrado.</Text>
                        <Text style={styles.emptyText}>
                            Por favor, faça um reporte para vê-lo no histórico.
                        </Text>
                    </View>
                )}
            // Optional performance tweaks:
            // initialNumToRender={10}
            // removeClippedSubviews={true}
            />
        </View>
    );
}
