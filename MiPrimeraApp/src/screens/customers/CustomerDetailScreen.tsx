import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RootStackParamList } from "../../navigation/StackNavigator";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import Tooltip from "../../components/Tooltip";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateCustomer } from "../../store/slices/customerProfileSlice";
import { useTheme } from "../../contexts/ThemeContext";
import { ThemeColors } from "../../utils/types/ThemeColors";

type Props = NativeStackScreenProps<RootStackParamList, 'CustomerDetail'>;

export default function CustomerDetailScreen({ route, navigation }: Props) {
    const { customerId } = route.params;
    const dispatch = useAppDispatch();
    const { colors } = useTheme();
    const styles = getStyles(colors);
    const customer = useAppSelector(state => state.customers.customers.find(c => c.id === customerId));

    const [nombre, setNombre] = useState(customer?.nombre ?? '');
    const [pecho, setPecho] = useState(customer?.pecho ?? '');
    const [cintura, setCintura] = useState(customer?.cintura ?? '');
    const [cadera, setCadera] = useState(customer?.cadera ?? '');
    const [hombro, setHombro] = useState(customer?.hombro ?? '');
    const [largoManga, setLargoManga] = useState(customer?.largoManga ?? '');
    const [cuello, setCuello] = useState(customer?.cuello ?? '');
    const [altura, setAltura] = useState(customer?.altura ?? '');
    const [talleEspalda, setTalleEspalda] = useState(customer?.talleEspalda ?? '');
    const [talleFrente, setTalleFrente] = useState(customer?.talleFrente ?? '');
    const [altoBusto, setAltoBusto] = useState(customer?.altoBusto ?? '');
    const [largoBlusa, setLargoBlusa] = useState(customer?.largoBlusa ?? '');
    const [contornoBrazo, setContornoBrazo] = useState(customer?.contornoBrazo ?? '');
    const [contornoPuno, setContornoPuno] = useState(customer?.contornoPuno ?? '');
    const [separacionBusto, setSeparacionBusto] = useState(customer?.separacionBusto ?? '');
    const [contornoTorax, setContornoTorax] = useState(customer?.contornoTorax ?? '');
    const [contornoMedioTalle, setContornoMedioTalle] = useState(customer?.contornoMedioTalle ?? '');
    const [entrepierna, setEntrepierna] = useState(customer?.entrepierna ?? '');
    const [tiro, setTiro] = useState(customer?.tiro ?? '');
    const [muslo, setMuslo] = useState(customer?.muslo ?? '');

    if (!customer) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.text }}>Cliente no encontrado</Text>
            </View>
        );
    }

    const handleSave = () => {
        dispatch(updateCustomer({
            id: customerId,
            userid: customer.userid,
            nombre,
            pecho,
            cintura,
            cadera,
            hombro,
            largoManga,
            cuello,
            altura,
            talleEspalda,
            talleFrente,
            altoBusto,
            largoBlusa,
            contornoBrazo,
            contornoPuno,
            separacionBusto,
            contornoTorax,
            contornoMedioTalle,
            entrepierna,
            tiro,
            muslo,
        }));
        navigation.goBack();
    };

    return (
        <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Detalle de cliente</Text>

            <View style={styles.labelRow}>
                <Text style={styles.label}>Nombre del cliente</Text>
                <Tooltip text="Ingrese el nombre completo del cliente." />
            </View>
            <CustomInput type="text" value={nombre} onChange={setNombre} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Pecho</Text>
                <Tooltip text="Alrededor de la parte más ancha del pecho / busto." />
            </View>
            <CustomInput type="decimal" value={pecho} onChange={setPecho} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Cintura</Text>
                <Tooltip text="Alrededor de la cintura natural (la parte más delgada)." />
            </View>
            <CustomInput type="decimal" value={cintura} onChange={setCintura} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Cadera</Text>
                <Tooltip text="Alrededor de la parte más ancha de las caderas." />
            </View>
            <CustomInput type="decimal" value={cadera} onChange={setCadera} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Hombro</Text>
                <Tooltip text="De punta a punta de los hombros, por la espalda." />
            </View>
            <CustomInput type="decimal" value={hombro} onChange={setHombro} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Largo de manga</Text>
                <Tooltip text="Del hombro hasta la muñeca, con el brazo ligeramente doblado." />
            </View>
            <CustomInput type="decimal" value={largoManga} onChange={setLargoManga} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Cuello</Text>
                <Tooltip text="Alrededor de la base del cuello." />
            </View>
            <CustomInput type="decimal" value={cuello} onChange={setCuello} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Altura</Text>
                <Tooltip text="Altura total de pie, sin zapatos." />
            </View>
            <CustomInput type="decimal" value={altura} onChange={setAltura} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Talle espalda</Text>
                <Tooltip text="Desde la 7.ª vértebra cervical (nuca) hasta la cintura, por la espalda." />
            </View>
            <CustomInput type="decimal" value={talleEspalda} onChange={setTalleEspalda} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Talle frente</Text>
                <Tooltip text="Desde el punto de hombro (unión cuello-hombro) hasta la cintura, por el frente." />
            </View>
            <CustomInput type="decimal" value={talleFrente} onChange={setTalleFrente} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Alto busto</Text>
                <Tooltip text="Desde el punto de hombro (cuello-hombro) hasta el punto más saliente del busto, en línea recta." />
            </View>
            <CustomInput type="decimal" value={altoBusto} onChange={setAltoBusto} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Largo blusa</Text>
                <Tooltip text="Desde el punto de hombro hasta el borde inferior deseado de la blusa." />
            </View>
            <CustomInput type="decimal" value={largoBlusa} onChange={setLargoBlusa} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Contorno de brazo</Text>
                <Tooltip text="Alrededor de la parte más gruesa del brazo (bícep), con el brazo relajado." />
            </View>
            <CustomInput type="decimal" value={contornoBrazo} onChange={setContornoBrazo} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Contorno de puño</Text>
                <Tooltip text="Alrededor de la muñeca, justo donde irá el puño o el remate de la manga." />
            </View>
            <CustomInput type="decimal" value={contornoPuno} onChange={setContornoPuno} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Separación de busto (opcional)</Text>
                <Tooltip text="Distancia entre los dos puntos más salientes del busto (de un pezón al otro)." />
            </View>
            <CustomInput type="decimal" value={separacionBusto} onChange={setSeparacionBusto} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Contorno de tórax (opcional)</Text>
                <Tooltip text="Alrededor del pecho por ENCIMA del busto, a la altura de la sisa." />
            </View>
            <CustomInput type="decimal" value={contornoTorax} onChange={setContornoTorax} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Contorno medio talle (opcional)</Text>
                <Tooltip text="Alrededor del torso en el punto medio entre el busto y la cintura." />
            </View>
            <CustomInput type="decimal" value={contornoMedioTalle} onChange={setContornoMedioTalle} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Entrepierna</Text>
                <Tooltip text="De la entrepierna hasta el suelo." />
            </View>
            <CustomInput type="decimal" value={entrepierna} onChange={setEntrepierna} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Tiro</Text>
                <Tooltip text="De la cintura hasta la entrepierna (sentado/a, medir el lateral)." />
            </View>
            <CustomInput type="decimal" value={tiro} onChange={setTiro} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Muslo</Text>
                <Tooltip text="Alrededor de la parte más gruesa del muslo." />
            </View>
            <CustomInput type="decimal" value={muslo} onChange={setMuslo} />

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
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 2,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.primary,
    },
});
