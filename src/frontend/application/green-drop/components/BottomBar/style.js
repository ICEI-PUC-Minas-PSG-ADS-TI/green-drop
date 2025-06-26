import { StyleSheet } from "react-native";
import { bottomBarColors, shadows } from "@/themes/index";

const getStyles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme === 'dark' ? bottomBarColors.dark.background : bottomBarColors.light.background,
        width: '100%',
        height: 60,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 3,

        // Destaque extra
        ...(
            theme === 'dark'
                ? shadows.dark.top
                : shadows.light.top
        ),

        // Borda sutil
        borderTopWidth: 2,
        borderTopColor: theme === 'dark' ? bottomBarColors.dark.border : bottomBarColors.light.border,
    },
    iconBox: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    icon: {
        color: theme === 'dark' ? bottomBarColors.dark.icon : bottomBarColors.light.icon,
    },
    iconText: {
        color: theme === 'dark' ? bottomBarColors.dark.text : bottomBarColors.light.text,
    }
});

export default getStyles;