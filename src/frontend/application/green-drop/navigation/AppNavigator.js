import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Conta from '../pages/conta';
import MapScreen from '../pages/map';
import ConfigScreen from '../pages/configuracoes';
import LoginScreen from '../pages/login';
import CadastroScreen from '../pages/cadastro';
import ReportHistory from '../pages/report_history';
import ProgressoScreen from '../pages/game_pages/progresso';
import ContributionNavigator from '../pages/contribuir/navigation/ContributionNavigator';

const Stack = createNativeStackNavigator();

/* const CustomHeaderLeft = ({ colorScheme }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
                paddingHorizontal: 16,
                justifyContent: 'center',
                minWidth: 80
            }}
        >
            <Text style={{
                color: colorScheme === "dark" ? colors.dark.text : colors.light.text,
                fontSize: 16
            }}>
                {"< Voltar"}
            </Text>
        </TouchableOpacity>
    );
};

const CustomHeaderRight = ({ colorScheme, showIcon = false, icon = null, pageName = '' }) => {
    const navigation = useNavigation();

    return (
        <View style={{
            paddingHorizontal: 16,
            minWidth: 80,
            flexDirection: 'row',
            justifyContent: 'flex-end'
        }}>
            {showIcon && (
                <TouchableOpacity
                    onPress={() => navigation.navigate(pageName)}
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                >
                    <FontAwesomeIcon
                        icon={icon}
                        size={20}
                        color={colorScheme === "dark" ? colors.dark.text : colors.light.text}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};
 */
/* const pageHeader = {
    headerStyle: {
        backgroundColor: isDark ? colors.dark.background : colors.light.background,
        borderBottomWidth: 1,
        borderBottomColor: isDark ? colors.dark.border : colors.light.border,
        height: Platform.OS === 'ios' ? 100 : 60,
    },
    headerTitleStyle: {
        color: isDark ? colors.dark.text : colors.light.text,
        fontSize: 18,
        fontWeight: "600",
        paddingBottom: 8
    },
    headerLeft: (props) => <CustomHeaderLeft {...props} colorScheme={colorScheme} />,
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
}; */
/*     const { colorScheme } = useTheme();
    const isDark = colorScheme === 'dark'; */
export default function AppNavigator() {
    return (
        <Stack.Navigator
            initialRouteName={'Mapa'}
            screenOptions={{
                animation: 'fade',
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Cadastro"
                component={CadastroScreen}
            />
            <Stack.Screen
                name="Configurações"
                component={ConfigScreen}
            />
            <Stack.Screen
                name="Conta"
                component={Conta}
            />
            <Stack.Screen
                name="Contribuir"
                component={ContributionNavigator}
            />
            <Stack.Screen
                name="Progresso"
                component={ProgressoScreen}
            />
            <Stack.Screen
                name="Histórico de Relatórios"
                component={ReportHistory}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Mapa"
                component={MapScreen}
            />
        </Stack.Navigator>
    );
}