import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../contexts/AuthContext";
import { TabsParamList } from "../navigation/TabsNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type Props = BottomTabScreenProps<TabsParamList, 'Home'>;

export default function HomeScreen({route, navigation}: Props)
{
    // const {email} = route.params;
    const {user} = useAuth();
    const goToAddCustomer = () => {
        navigation.navigate('Home');
    };

    const goToAddOrder = () => {
        navigation.navigate('UserTabs');
    };

    return (
        <View>
            <Text>Bienvenido {user?.email}, a Home</Text>
            <CustomButton title={"Crear cliente"} onPress={goToAddCustomer}/>
            <CustomButton title={"Crear orden"} onPress={}/>
        </View>
    );
}