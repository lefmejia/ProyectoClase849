import { View, StyleSheet, Text } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function LoginScreen ({navigation}:any)
{
    const [email, setEmail] = useState("lefmejia@unitec.edu");
    const [password, setPassword] = useState("");
    const {login} = useAuth();
    const { colors } = useTheme();

    const handleLogin = () => {
        try{
            const allowed = login(email);
            if(allowed)
            {
                navigation.navigate('MainTabs', {email})
            }
            else
            {
                console.log("no tiene acceso");
            }
        }catch(error){
            console.log(error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View>
                <Text>{process.env.EXPO_PUBLIC_MI_VARIABLE}</Text>
            </View>
            <CustomInput placeholder={'Ingresa tu correo'} value={email} onChange={setEmail}/>

            <CustomInput type={'password'} value={password} placeholder={'Ingresa tu contraseña'} onChange={setPassword}/>

            <CustomButton title={"Ingresar"} onPress={handleLogin}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
});