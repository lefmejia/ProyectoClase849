import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "../../navigation/StackNavigator";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addOrder } from "../../store/slices/orderSlice";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { ThemeColors } from "../../utils/types/ThemeColors";

type Props = NativeStackScreenProps<RootStackParamList, 'AddOrder'>;

export default function AddOrderScreen({ navigation }: Props) {
    const dispatch = useAppDispatch();
    const { user } = useAuth();
    const customers = useAppSelector(state => state.customers.customers);
    const { colors } = useTheme();
    const styles = getStyles(colors);

    const [selectedCustomerId, setSelectedCustomerId] = useState(0);
    const [tipoRopa, setTipoRopa] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [imageUri, setImageUri] = useState<string | undefined>(undefined);

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.7,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        if (!selectedCustomerId || !tipoRopa.trim() || !descripcion.trim() || !precio.trim() || !fechaEntrega.trim()) {
            Alert.alert("Campos requeridos", "Completa todos los campos antes de continuar.");
            return;
        }

        dispatch(addOrder({
            customerId: selectedCustomerId,
            userid: user?.userid!,
            tipoRopa,
            descripcion,
            precio,
            fechaEntrega,
            fechaCreacion: new Date().toISOString(),
            estado: 'pendiente',
            imageUri,
        }));
        navigation.goBack();
    };

    return (
        <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Agregar orden</Text>

            <Text style={styles.label}>Cliente</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedCustomerId}
                    onValueChange={setSelectedCustomerId}
                    style={{ color: colors.text }}
                    dropdownIconColor={colors.text}
                >
                    <Picker.Item label="Seleccionar cliente..." value="" />
                    {customers.map(c => (
                        <Picker.Item key={c.id} label={c.nombre} value={c.id} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Tipo de ropa</Text>
            <CustomInput type="text" value={tipoRopa} onChange={setTipoRopa} />

            <Text style={styles.label}>Descripcion</Text>
            <CustomInput type="text" value={descripcion} onChange={setDescripcion} />

            <Text style={styles.label}>Precio</Text>
            <CustomInput type="decimal" value={precio} onChange={setPrecio} />

            <Text style={styles.label}>Fecha de entrega</Text>
            <CustomInput type="calendar" placeholder="Seleccione una fecha" value={fechaEntrega} onChange={setFechaEntrega} />

            <Text style={styles.label}>Imagen (opcional)</Text>
            {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.preview} />
            )}
            <CustomButton title={imageUri ? "Cambiar imagen" : "Seleccionar imagen"} onPress={pickImage} />

            <CustomButton title="Agregar orden" onPress={handleSave} />
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
    pickerContainer: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 9,
        backgroundColor: colors.inputBackground,
        marginTop: 10,
        marginBottom: 10,
    },
    preview: {
        width: '100%',
        height: 200,
        borderRadius: 9,
        marginTop: 10,
        marginBottom: 10,
    },
});
