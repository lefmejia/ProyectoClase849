import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../contexts/AuthContext";
import { TabsParamList } from "../navigation/TabsNavigator";

type Props = NativeStackScreenProps<RootStackParamList, 'AddCustomer'>;

export default function AddCustomerScreen({route, navigation}: Props)
{
    // const {email} = route.params;
    const {user} = useAuth();
    const handleLoadSettings = () => {
        //navigation.navigate('UserTabs');
    }
    return (
        <View>
            <Text>Bienvenido {user?.email}, a Home</Text>
            <CustomButton title={"Agregar cliente"} onPress={handleLoadSettings}/>
        </View>
    );
}