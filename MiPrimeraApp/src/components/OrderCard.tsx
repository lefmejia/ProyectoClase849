import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { ThemeColors } from "../utils/types/ThemeColors";

type OrderCardProps = {
  customerName: string;
  tipoRopa: string;
  fechaEntrega: string;
  estado: string;
  onPress: () => void;
};

export default function OrderCard({
  customerName,
  tipoRopa,
  fechaEntrega,
  estado,
  onPress,
}: OrderCardProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={styles.brand}>{tipoRopa}</Text>
          <Text style={styles.name}>Orden de {customerName}</Text>
          <Text style={styles.category}>Entregar: {fechaEntrega}</Text>
          <Text style={styles.category}>Estado: {estado}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  card: {
    backgroundColor: colors.inputBackground,
    borderRadius: 9,
    padding: 14,
    marginBottom: 10,
    borderColor: colors.border,
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
  },
  brand: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  name: {
    fontSize: 13,
    marginTop: 2,
    color: colors.textSecondary,
  },
  category: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
    color: colors.primary,
  },
});
