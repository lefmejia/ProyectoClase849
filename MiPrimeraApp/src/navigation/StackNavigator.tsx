import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import TabsNavigator from "./TabsNavigator";
import AddCustomerScreen from "../screens/AddCustomerScreen";
import AddOrderScreen from "../screens/AddOrderScreen";


export type RootStackParamList = {
    Login: undefined,
    MainTabs: {email: string},
    AddCustomer: undefined,
    AddOrder: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator()
{
    return(
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:true}}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name='MainTabs' component={TabsNavigator} />
            <Stack.Screen name='AddCustomer' component={AddCustomerScreen} />
            <Stack.Screen name='AddOrder' component={AddOrderScreen} />
        </Stack.Navigator>
    );
}