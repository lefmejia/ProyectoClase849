import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Tooltip from "../components/Tooltip";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addCustomer } from "../store/slices/customerProfileSlice";

type Props = NativeStackScreenProps<RootStackParamList, 'AddCustomer'>;

export default function AddCustomerScreen({ route, navigation }: Props) {
    const { user } = useAuth();
    const dispatch = useAppDispatch();

    const [nombre, setNombre] = useState('');
    const [pecho, setPecho] = useState('');
    const [cintura, setCintura] = useState('');
    const [cadera, setCadera] = useState('');
    const [hombro, setHombro] = useState('');
    const [largoManga, setLargoManga] = useState('');
    const [cuello, setCuello] = useState('');
    const [altura, setAltura] = useState('');
    const [talleEspalda, setTalleEspalda] = useState('');
    const [talleFrente, setTalleFrente] = useState('');
    const [altoBusto, setAltoBusto] = useState('');
    const [largoBlusa, setLargoBlusa] = useState('');
    const [contornoBrazo, setContornoBrazo] = useState('');
    const [contornoPuno, setContornoPuno] = useState('');
    const [separacionBusto, setSeparacionBusto] = useState('');
    const [contornoTorax, setContornoTorax] = useState('');
    const [contornoMedioTalle, setContornoMedioTalle] = useState('');
    const [entrepierna, setEntrepierna] = useState('');
    const [tiro, setTiro] = useState('');
    const [muslo, setMuslo] = useState('');

    const handleSave = () => {
        dispatch(addCustomer({
            id: Date.now().toString(),
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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Agregar cliente</Text>

            <View style={styles.labelRow}>
                <Text style={styles.label}>Nombre del cliente</Text>
                <Tooltip text="Ingrese el nombre completo del cliente." />
            </View>
            <CustomInput type="text" value={nombre} onChange={setNombre} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Pecho</Text>
                <Tooltip text="Alrededor de la parte más ancha del pecho / busto." />
            </View>
            <CustomInput type="text" value={pecho} onChange={setPecho} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Cintura</Text>
                <Tooltip text="Alrededor de la cintura natural (la parte más delgada)." />
            </View>
            <CustomInput type="text" value={cintura} onChange={setCintura} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Cadera</Text>
                <Tooltip text="Alrededor de la parte más ancha de las caderas." />
            </View>
            <CustomInput type="text" value={cadera} onChange={setCadera} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Hombro</Text>
                <Tooltip text="De punta a punta de los hombros, por la espalda." />
            </View>
            <CustomInput type="text" value={hombro} onChange={setHombro} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Largo de manga</Text>
                <Tooltip text="Del hombro hasta la muñeca, con el brazo ligeramente doblado." />
            </View>
            <CustomInput type="text" value={largoManga} onChange={setLargoManga} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Cuello</Text>
                <Tooltip text="Alrededor de la base del cuello." />
            </View>
            <CustomInput type="text" value={cuello} onChange={setCuello} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Altura</Text>
                <Tooltip text="Altura total de pie, sin zapatos." />
            </View>
            <CustomInput type="text" value={altura} onChange={setAltura} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Talle espalda</Text>
                <Tooltip text="Desde la 7.ª vértebra cervical (nuca) hasta la cintura, por la espalda." />
            </View>
            <CustomInput type="text" value={talleEspalda} onChange={setTalleEspalda} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Talle frente</Text>
                <Tooltip text="Desde el punto de hombro (unión cuello-hombro) hasta la cintura, por el frente." />
            </View>
            <CustomInput type="text" value={talleFrente} onChange={setTalleFrente} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Alto busto</Text>
                <Tooltip text="Desde el punto de hombro (cuello-hombro) hasta el punto más saliente del busto, en línea recta." />
            </View>
            <CustomInput type="text" value={altoBusto} onChange={setAltoBusto} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Largo blusa</Text>
                <Tooltip text="Desde el punto de hombro hasta el borde inferior deseado de la blusa." />
            </View>
            <CustomInput type="text" value={largoBlusa} onChange={setLargoBlusa} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Contorno de brazo</Text>
                <Tooltip text="Alrededor de la parte más gruesa del brazo (bícep), con el brazo relajado." />
            </View>
            <CustomInput type="text" value={contornoBrazo} onChange={setContornoBrazo} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Contorno de puño</Text>
                <Tooltip text="Alrededor de la muñeca, justo donde irá el puño o el remate de la manga." />
            </View>
            <CustomInput type="text" value={contornoPuno} onChange={setContornoPuno} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Separación de busto (opcional)</Text>
                <Tooltip text="Distancia entre los dos puntos más salientes del busto (de un pezón al otro)." />
            </View>
            <CustomInput type="text" value={separacionBusto} onChange={setSeparacionBusto} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Contorno de tórax (opcional)</Text>
                <Tooltip text="Alrededor del pecho por ENCIMA del busto, a la altura de la sisa." />
            </View>
            <CustomInput type="text" value={contornoTorax} onChange={setContornoTorax} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Contorno medio talle (opcional)</Text>
                <Tooltip text="Alrededor del torso en el punto medio entre el busto y la cintura." />
            </View>
            <CustomInput type="text" value={contornoMedioTalle} onChange={setContornoMedioTalle} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Entrepierna</Text>
                <Tooltip text="De la entrepierna hasta el suelo." />
            </View>
            <CustomInput type="text" value={entrepierna} onChange={setEntrepierna} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Tiro</Text>
                <Tooltip text="De la cintura hasta la entrepierna (sentado/a, medir el lateral)." />
            </View>
            <CustomInput type="text" value={tiro} onChange={setTiro} />

            <View style={styles.labelRow}>
                <Text style={styles.label}>Muslo</Text>
                <Tooltip text="Alrededor de la parte más gruesa del muslo." />
            </View>
            <CustomInput type="text" value={muslo} onChange={setMuslo} />

            <CustomButton title="Agregar cliente" onPress={handleSave} />
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
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 2,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
    },
});
