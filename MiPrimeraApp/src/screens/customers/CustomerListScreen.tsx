import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { TabsParamList } from "../../navigation/TabsNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { useAppSelector } from "../../store/hooks";
import { useTheme } from "../../contexts/ThemeContext";
import { ThemeColors } from "../../utils/types/ThemeColors";

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabsParamList, 'CustomerList'>,
    NativeStackScreenProps<RootStackParamList>
>;

export default function CustomerListScreen({ navigation }: Props) {
    const customers = useAppSelector((state) => state.customers.customers);
    const { colors } = useTheme();
    const styles = getStyles(colors);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clientes</Text>
            <FlatList
                data={customers}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay clientes</Text>}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => navigation.navigate('CustomerDetail', { customerId: item.id! })}
                    >
                        <Text style={styles.itemText}>{item.nombre}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const getStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        color: colors.primary,
    },
    item: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 9,
        backgroundColor: colors.inputBackground,
        marginBottom: 10,
        borderColor: colors.border,
        borderWidth: 1,
    },
    itemText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    emptyText: {
        color: colors.textSecondary,
    },
});
