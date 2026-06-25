import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTheme } from "../contexts/ThemeContext";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import TabsNavigator from "./TabsNavigator";
import AddCustomerScreen from "../screens/customers/AddCustomerScreen";
import AddOrderScreen from "../screens/orders/AddOrderScreen";
import OrderDetailScreen from "../screens/orders/OrderDetailScreen";
import CustomerDetailScreen from "../screens/customers/CustomerDetailScreen";
import RegisterScreen from "../screens/RegisterScreen";


export type RootStackParamList = {
    Login: undefined,
    Register: undefined,
    MainTabs: {email: string},
    AddCustomer: undefined,
    AddOrder: undefined,
    OrderDetail: {orderId: number},
    CustomerDetail: {customerId: number}
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator()
{
    const { colors } = useTheme();

    return(
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerStyle: { backgroundColor: colors.headerBackground },
                contentStyle: { backgroundColor: colors.background },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name='MainTabs' component={TabsNavigator} />
            <Stack.Screen 
                name='AddCustomer' 
                component={AddCustomerScreen} 
                options={{
                    headerStyle: { backgroundColor: colors.headerBackground },
                    contentStyle: { backgroundColor: colors.background },
                    headerBackButtonDisplayMode: "minimal"
                }}
                />
            <Stack.Screen 
                name='AddOrder' 
                component={AddOrderScreen} 
                options={{
                    headerStyle: { backgroundColor: colors.headerBackground },
                    contentStyle: { backgroundColor: colors.background },
                }}
                />
            <Stack.Screen 
                name='OrderDetail' 
                component={OrderDetailScreen} 
                options={{
                    headerStyle: { backgroundColor: colors.headerBackground },
                    contentStyle: { backgroundColor: colors.background },
                }}
                />
            <Stack.Screen 
                name='CustomerDetail' 
                component={CustomerDetailScreen}
                options={{
                    headerStyle: { backgroundColor: colors.headerBackground },
                    contentStyle: { backgroundColor: colors.background },
                }}
                 />
        </Stack.Navigator>
    );
}