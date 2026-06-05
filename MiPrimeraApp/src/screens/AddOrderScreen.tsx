import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RootStackParamList } from "../navigation/StackNavigator";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addOrder } from "../store/slices/orderSlice";

type Props = NativeStackScreenProps<RootStackParamList, 'AddOrder'>;

export default function AddOrderScreen({ navigation }: Props) {
    const dispatch = useAppDispatch();
    const customers = useAppSelector(state => state.customers.customers);

    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [tipoRopa, setTipoRopa] = useState('');
    const [precio, setPrecio] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');

    const handleSave = () => {
        dispatch(addOrder({
            id: Date.now().toString(),
            customerId: selectedCustomerId,
            tipoRopa,
            precio,
            fechaEntrega,
            fechaCreacion: new Date().toISOString(),
            estado: 'pendiente',
        }));
        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Agregar orden</Text>

            <Text style={styles.label}>Cliente</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedCustomerId}
                    onValueChange={setSelectedCustomerId}
                >
                    <Picker.Item label="Seleccionar cliente..." value="" />
                    {customers.map(c => (
                        <Picker.Item key={c.id} label={c.nombre} value={c.id} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Tipo de ropa</Text>
            <CustomInput type="text" value={tipoRopa} onChange={setTipoRopa} />

            <Text style={styles.label}>Precio</Text>
            <CustomInput type="text" value={precio} onChange={setPrecio} />

            <Text style={styles.label}>Fecha de entrega (DD/MM/AAAA)</Text>
            <CustomInput type="text" value={fechaEntrega} onChange={setFechaEntrega} />

            <CustomButton title="Agregar orden" onPress={handleSave} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 2,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 9,
        backgroundColor: '#f0f0f0',
        marginTop: 10,
        marginBottom: 10,
    },
});
