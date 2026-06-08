import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../contexts/ThemeContext";
import ProfileScreen from "../screens/UserSettings/ProfileScreen";
import SettingsScreen from "../screens/UserSettings/SettingsScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./StackNavigator";
import HomeScreen from "../screens/HomeScreen";
import CustomerListScreen from "../screens/customers/CustomerListScreen";
import { Ionicons } from "@expo/vector-icons";


export type TabsParamList = {
    Home: { email: string };
    CustomerList: undefined;
    Profile: { email: string };
    Settings: undefined;
}

type Props = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabNavigator({route, navigation}: Props){
    const { colors } = useTheme();

    return(
        <Tab.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: colors.headerBackground },
                headerTintColor: colors.headerText,
                tabBarStyle: { backgroundColor: colors.tabBarBackground },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                headerShown: false,
            }}
        >
            <Tab.Screen 
                name="Home" 
                component = {HomeScreen}
                options={{
                title: "Inicio",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                ),
                }}
                />
            <Tab.Screen 
                name="CustomerList" 
                component = {CustomerListScreen}
                options={{
                title: "Clientes",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="list-outline" size={size} color={color} />
                ),
                }}
                />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                title: "Mi Perfil",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person" size={size} color={color} />
                ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                title: "Configuración",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="settings" size={size} color={color} />
                ),
                }}
            />
        </Tab.Navigator>
    );
}