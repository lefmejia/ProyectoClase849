import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTheme } from "../contexts/ThemeContext";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import TabsNavigator from "./TabsNavigator";
import AddCustomerScreen from "../screens/customers/AddCustomerScreen";
import AddOrderScreen from "../screens/orders/AddOrderScreen";
import OrderDetailScreen from "../screens/orders/OrderDetailScreen";
import CustomerDetailScreen from "../screens/customers/CustomerDetailScreen";


export type RootStackParamList = {
    Login: undefined,
    MainTabs: {email: string},
    AddCustomer: undefined,
    AddOrder: undefined,
    OrderDetail: {orderId: string},
    CustomerDetail: {customerId: string}
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator()
{
    const { colors } = useTheme();

    return(
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: colors.headerBackground },
                headerTintColor: colors.headerText,
                contentStyle: { backgroundColor: colors.background },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name='MainTabs' component={TabsNavigator} />
            <Stack.Screen 
                name='AddCustomer' 
                component={AddCustomerScreen} 
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: colors.headerBackground },
                    headerTintColor: colors.headerText,
                    contentStyle: { backgroundColor: colors.background },
                    headerBackButtonDisplayMode: "minimal"
                }}
                />
            <Stack.Screen 
                name='AddOrder' 
                component={AddOrderScreen} 
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: colors.headerBackground },
                    headerTintColor: colors.headerText,
                    contentStyle: { backgroundColor: colors.background },
                }}
                />
            <Stack.Screen 
                name='OrderDetail' 
                component={OrderDetailScreen} 
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: colors.headerBackground },
                    headerTintColor: colors.headerText,
                    contentStyle: { backgroundColor: colors.background },
                }}
                />
            <Stack.Screen 
                name='CustomerDetail' 
                component={CustomerDetailScreen}
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: colors.headerBackground },
                    headerTintColor: colors.headerText,
                    contentStyle: { backgroundColor: colors.background },
                }}
                 />
        </Stack.Navigator>
    );
}