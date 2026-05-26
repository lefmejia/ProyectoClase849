import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

type Props = NativeStackScreenProps<RootStackParamList, 'AddCustomer'>;

export default function AddCustomerScreen({ route, navigation }: Props) {
    const { user } = useAuth();

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
        // TODO: save customer
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Agregar cliente</Text>

            <Text style={styles.label}>Nombre del cliente</Text>
            <CustomInput
                type="text"
                placeholder="Ingresar nombre del cliente"
                value={nombre}
                onChange={setNombre}
            />

            <Text style={styles.label}>Pecho</Text>
            <CustomInput
                type="text"
                placeholder="Alrededor de la parte más ancha del pecho / busto."
                value={pecho}
                onChange={setPecho}
            />

            <Text style={styles.label}>Cintura</Text>
            <CustomInput
                type="text"
                placeholder="Alrededor de la cintura natural (la parte más delgada)."
                value={cintura}
                onChange={setCintura}
            />

            <Text style={styles.label}>Cadera</Text>
            <CustomInput
                type="text"
                placeholder="Alrededor de la parte más ancha de las caderas."
                value={cadera}
                onChange={setCadera}
            />

            <Text style={styles.label}>Hombro</Text>
            <CustomInput
                type="text"
                placeholder="De punta a punta de los hombros, por la espalda."
                value={hombro}
                onChange={setHombro}
            />

            <Text style={styles.label}>Largo de manga</Text>
            <CustomInput
                type="text"
                placeholder="Del hombro hasta la muñeca, con el brazo ligeramente doblado."
                value={largoManga}
                onChange={setLargoManga}
            />

            <Text style={styles.label}>Cuello</Text>
            <CustomInput
                type="text"
                placeholder="Alrededor de la base del cuello."
                value={cuello}
                onChange={setCuello}
            />

            <Text style={styles.label}>Altura</Text>
            <CustomInput
                type="text"
                placeholder="Altura total de pie, sin zapatos."
                value={altura}
                onChange={setAltura}
            />

            <Text style={styles.label}>Talle espalda</Text>
            <CustomInput
                type="text"
                placeholder="Desde la 7.ª vértebra cervical (nuca) hasta la cintura, por la espalda."
                value={talleEspalda}
                onChange={setTalleEspalda}
            />

            <Text style={styles.label}>Talle frente</Text>
            <CustomInput
                type="text"
                placeholder="Desde el punto de hombro (unión cuello-hombro) hasta la cintura, por el frente."
                value={talleFrente}
                onChange={setTalleFrente}
            />

            <Text style={styles.label}>Alto busto</Text>
            <CustomInput
                type="text"
                placeholder="Desde el punto de hombro (cuello-hombro) hasta el punto más saliente del busto, en línea recta."
                value={altoBusto}
                onChange={setAltoBusto}
            />

            <Text style={styles.label}>Largo blusa</Text>
            <CustomInput
                type="text"
                placeholder="Desde el punto de hombro hasta el borde inferior deseado de la blusa."
                value={largoBlusa}
                onChange={setLargoBlusa}
            />

            <Text style={styles.label}>Contorno de brazo</Text>
            <CustomInput
                type="text"
                placeholder="Alrededor de la parte más gruesa del brazo (bícep), con el brazo relajado."
                value={contornoBrazo}
                onChange={setContornoBrazo}
            />

            <Text style={styles.label}>Contorno de puño</Text>
            <CustomInput
                type="text"
                placeholder="Alrededor de la muñeca, justo donde irá el puño o el remate de la manga."
                value={contornoPuno}
                onChange={setContornoPuno}
            />

            <Text style={styles.label}>Separación de busto (opcional)</Text>
            <CustomInput
                type="text"
                placeholder="Distancia entre los dos puntos más salientes del busto (de un pezón al otro)."
                value={separacionBusto}
                onChange={setSeparacionBusto}
            />

            <Text style={styles.label}>Contorno de tórax (opcional)</Text>
            <CustomInput
                type="text"
                placeholder="Alrededor del pecho por ENCIMA del busto, a la altura de la sisa."
                value={contornoTorax}
                onChange={setContornoTorax}
            />

            <Text style={styles.label}>Contorno medio talle (opcional)</Text>
            <CustomInput
                type="text"
                placeholder="Alrededor del torso en el punto medio entre el busto y la cintura."
                value={contornoMedioTalle}
                onChange={setContornoMedioTalle}
            />

            <Text style={styles.label}>Entrepierna</Text>
            <CustomInput
                type="text"
                placeholder="De la entrepierna hasta el suelo."
                value={entrepierna}
                onChange={setEntrepierna}
            />

            <Text style={styles.label}>Tiro</Text>
            <CustomInput
                type="text"
                placeholder="De la cintura hasta la entrepierna (sentado/a, medir el lateral)."
                value={tiro}
                onChange={setTiro}
            />

            <Text style={styles.label}>Muslo</Text>
            <CustomInput
                type="text"
                placeholder="Alrededor de la parte más gruesa del muslo."
                value={muslo}
                onChange={setMuslo}
            />

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
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 8,
        marginBottom: 2,
    },
});
