import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../contexts/AuthContext";
import { TabsParamList } from "../navigation/TabsNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabsParamList, 'Home'>,
    NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({route, navigation}: Props)
{
    const {user} = useAuth();

    const goToAddCustomer = () => {
        navigation.navigate('AddCustomer');
    };

    const goToAddOrder = () => {
        navigation.navigate('AddOrder');
    };

    return (
        <View>
            <Text>Bienvenido {user?.email}, a Home</Text>
            <CustomButton title={"Crear cliente"} onPress={goToAddCustomer}/>
            <CustomButton title={"Crear orden"} onPress={goToAddOrder}/>
        </View>
    );
}