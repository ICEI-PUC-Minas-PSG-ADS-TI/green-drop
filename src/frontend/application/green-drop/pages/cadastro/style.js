import { StyleSheet } from "react-native";
import { colors } from "@/themes/index";

const getStyles = (theme) => StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors[theme].button,
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 8,
    paddingVertical: 14,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors[theme].buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? colors.dark.pageBackground : colors.light.pageBackground,
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 16,
  },
  divider: {
    backgroundColor: theme === 'dark' ? colors.dark.border : colors.light.border,
    height: 1,
    marginVertical: 16,
    width: '100%',
  },
  formBox: {
    backgroundColor: theme === 'dark' ? colors.dark.boxBackground : colors.light.boxBackground,
    borderRadius: 12,
    elevation: 2,
    flex: 1,
    maxWidth: 400,
    padding: 24,
    marginTop: 20,
    alignContent: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    width: '100%',
  },
  input: {
    backgroundColor: theme === 'dark' ? colors.dark.background : colors.light.background,
    borderColor: theme === 'dark' ? colors.dark.inputBorder : colors.light.inputBorder,
    borderRadius: 4,
    borderWidth: 1,
    color: theme === 'dark' ? colors.dark.text : colors.light.text,
    fontSize: 16,
    marginBottom: 14,
    padding: 10,
  },
  linkContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  linkText: {
    color: theme === 'dark' ? colors.dark.link : colors.light.link,
    fontSize: 15,
  },
  title: {
    color: theme === 'dark' ? colors.dark.text : colors.light.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default getStyles;