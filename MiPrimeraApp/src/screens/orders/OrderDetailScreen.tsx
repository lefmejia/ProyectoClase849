import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RootStackParamList } from "../../navigation/StackNavigator";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateOrder } from "../../store/slices/orderSlice";
import { OrderStatus } from "../../utils/types/Order";
import { useTheme } from "../../contexts/ThemeContext";
import { ThemeColors } from "../../utils/types/ThemeColors";

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetail'>;

export default function OrderDetailScreen({ route, navigation }: Props) {
    const { orderId } = route.params;
    const dispatch = useAppDispatch();
    const { colors } = useTheme();
    const styles = getStyles(colors);
    const order = useAppSelector(state => state.orders.orders.find(o => o.id === orderId));
    const customers = useAppSelector(state => state.customers.customers);
    const customer = customers.find(c => c.id === order?.customerId);

    const [tipoRopa, setTipoRopa] = useState(order?.tipoRopa ?? '');
    const [descripcion, setDescripcion] = useState(order?.descripcion ?? '');
    const [precio, setPrecio] = useState(order?.precio ?? '');
    const [fechaEntrega, setFechaEntrega] = useState(order?.fechaEntrega ?? '');
    const [fechaCreacion, setFechaCreacion] = useState(order?.fechaCreacion ?? '');
    const [estado, setEstado] = useState<OrderStatus>(order?.estado ?? 'pendiente');

    if (!order) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.text }}>Orden no encontrada</Text>
            </View>
        );
    }

    const handleSave = () => {
        dispatch(updateOrder({
            id: orderId,
            tipoRopa,
            descripcion,
            precio,
            fechaEntrega,
            fechaCreacion,
            estado,
        }));
        navigation.goBack();
    };

    return (
        <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Detalle de orden</Text>

            <Text style={styles.label}>Cliente</Text>
            <Text style={styles.readOnlyValue}>{customer?.nombre ?? ''}</Text>

            <Text style={styles.label}>Tipo de ropa</Text>
            <CustomInput type="text" value={tipoRopa} onChange={setTipoRopa} />

            <Text style={styles.label}>Descripcion</Text>
            <CustomInput type="text" value={descripcion} onChange={setDescripcion} />

            <Text style={styles.label}>Precio</Text>
            <CustomInput type="decimal" value={precio} onChange={setPrecio} />

            <Text style={styles.label}>Fecha de entrega</Text>
            <CustomInput type="calendar" placeholder="Seleccione una fecha" value={fechaEntrega} onChange={setFechaEntrega} />

            <Text style={styles.label}>Fecha de creacion</Text>
            <Text style={styles.readOnlyValue}>{fechaCreacion}</Text>

            <Text style={styles.label}>Estado</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={estado}
                    onValueChange={(value) => setEstado(value as OrderStatus)}
                    style={{ color: colors.text }}
                    dropdownIconColor={colors.text}
                >
                    <Picker.Item label="Pendiente" value="pendiente" />
                    <Picker.Item label="En progreso" value="en progreso" />
                    <Picker.Item label="Completada" value="completada" />
                </Picker>
            </View>

            <CustomButton title="Guardar cambios" onPress={handleSave} />
        </ScrollView>
    );
}

const getStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        color: colors.primary,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 2,
        color: colors.primary,
    },
    readOnlyValue: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 9,
        backgroundColor: colors.inputBackground,
        color: colors.textSecondary,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 9,
        backgroundColor: colors.inputBackground,
        marginTop: 10,
        marginBottom: 10,
    },
});
