import { View, Text, StyleSheet, Switch } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { navigationRef } from "../../navigation/NavigationService";

export default function SettingsScreen() {
  const { logout } = useAuth();
  const { colors, theme, toggleTheme, isDark } = useTheme();

  const handleLogout = () => {
    logout();
    if (navigationRef.isReady()) {
      navigationRef.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.section, { backgroundColor: colors.inputBackground }]}>
        <Text style={[styles.sectionLabel, { color: colors.primary }]}>Apariencia</Text>
        <Text style={[styles.currentValue, { color: colors.textSecondary }]}>
            Tema actual: {isDark ? "Oscuro" : "Claro"}
        </Text>
        <Switch 
            value={isDark}
            onValueChange={toggleTheme}
            thumbColor={colors.onSecondary}
        />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        padding: 16,
    },
    section: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "gray",
    padding: 14,
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  currentValue: {
    fontSize: 13,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
});
