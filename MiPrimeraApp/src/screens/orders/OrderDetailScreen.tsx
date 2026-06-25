import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "../../navigation/StackNavigator";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateOrder } from "../../store/slices/orderSlice";
import { OrderStatus } from "../../utils/types/Order";
import { useTheme } from "../../contexts/ThemeContext";
import { ThemeColors } from "../../utils/types/ThemeColors";
import { supabase } from "../../services/supabaseClient";

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
    const [imageUri, setImageUri] = useState<string | undefined>(undefined);
    const [isEditable, setIsEditable] = useState(false);
    const [isImageExpanded, setIsImageExpanded] = useState(false);

    const existingImageUrl = order?.imagePath
        ? supabase.storage.from('almacenamientoapp').getPublicUrl(order.imagePath).data.publicUrl
        : undefined;

    if (!order) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.text }}>Orden no encontrada</Text>
            </View>
        );
    }

    const pickImage = async () => {
        console.log(existingImageUrl);
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
        dispatch(updateOrder({
            id: orderId,
            customerId: order.customerId,
            userid: order.userid,
            tipoRopa,
            descripcion,
            precio,
            fechaEntrega,
            fechaCreacion,
            estado,
            imageUri,
        }));
        navigation.goBack();
    };

    const changeEditState = () => {
        setIsEditable(!isEditable);
    }

    return (
        <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
            <View style={styles.titleRow}>
                <Text style={styles.title}>Detalle de orden</Text>
                <TouchableOpacity onPress={changeEditState}>
                    <Text style={{ color: colors.primary, fontSize: 16 }}>Editar</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Cliente</Text>
            <Text style={styles.readOnlyValue}>{customer?.nombre ?? ''}</Text>

            <Text style={styles.label}>Tipo de ropa</Text>
            {isEditable?
            <CustomInput type="text" value={tipoRopa} onChange={setTipoRopa} />
            :<Text style={styles.readOnlyValue}>{tipoRopa}</Text>
            }
            <Text style={styles.label}>Descripcion</Text>
            {isEditable?
            <CustomInput type="text" value={descripcion} onChange={setDescripcion} />
            :<Text style={styles.readOnlyValue}>{descripcion}</Text>
            }

            <Text style={styles.label}>Precio</Text>
            {isEditable?
            <CustomInput type="decimal" value={precio} onChange={setPrecio} />
            :<Text style={styles.readOnlyValue}>{precio}</Text>
            }

            <Text style={styles.label}>Fecha de entrega</Text>
            {isEditable?
            <CustomInput type="calendar" placeholder="Seleccione una fecha" value={fechaEntrega} onChange={setFechaEntrega} />
            :<Text style={styles.readOnlyValue}>{fechaEntrega}</Text>
            }

            <Text style={styles.label}>Fecha de creacion</Text>
            <Text style={styles.readOnlyValue}>{fechaCreacion}</Text>

            <Text style={styles.label}>Estado</Text>
            {isEditable?
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
            :<Text style={styles.readOnlyValue}>{estado}</Text>
            }
            

            <Text style={styles.label}>Imagen de referencia</Text>
            {(imageUri ?? existingImageUrl) && (
                <TouchableOpacity onPress={() => setIsImageExpanded(true)}>
                    <Image source={{ uri: imageUri ?? existingImageUrl }} style={styles.preview} />
                </TouchableOpacity>
            )}

            <Modal visible={isImageExpanded} transparent onRequestClose={() => setIsImageExpanded(false)}>
                <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setIsImageExpanded(false)}>
                    <Image source={{ uri: imageUri ?? existingImageUrl }} style={styles.expandedImage} resizeMode="contain" />
                </TouchableOpacity>
            </Modal>
            {isEditable && <CustomButton title={imageUri ?? existingImageUrl ? "Cambiar imagen" : "Seleccionar imagen"} onPress={pickImage} />}

            {isEditable && <CustomButton title="Guardar cambios" onPress={handleSave} />}
        </ScrollView>
    );
}

const getStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        padding: 16,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
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
    preview: {
        width: '100%',
        height: 200,
        borderRadius: 9,
        marginTop: 10,
        marginBottom: 10,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    expandedImage: {
        width: '100%',
        height: '100%',
    },
});
