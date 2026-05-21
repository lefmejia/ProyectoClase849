import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/UserSettings/ProfileScreen";
import SettingsScreen from "../screens/UserSettings/SettingsScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./StackNavigator";
import HomeScreen from "../screens/HomeScreen";


export type TabsParamList = {
    Home: { email: string };
    Profile: { email: string };
    Settings: undefined;
}

type Props = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabNavigator({route, navigation}: Props){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component = {HomeScreen}/>
            <Tab.Screen name="Profile" component = {ProfileScreen}/>
            <Tab.Screen name="Settings" component = {SettingsScreen}/>
        </Tab.Navigator>
    );
}