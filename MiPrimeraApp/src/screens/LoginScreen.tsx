import { View, StyleSheet, Text, Alert } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function LoginScreen ({navigation}:any)
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth();
    const { colors } = useTheme();

    const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Campos requeridos", "Ingresa tu correo y contraseña.");
      return;
    }

    const success = await login(email.trim(), password);
    if (success) {
      navigation.navigate("MainTabs");
    }
  };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <CustomInput placeholder={'Ingresa tu correo'} value={email} onChange={setEmail}/>

            <CustomInput type={'password'} value={password} placeholder={'Ingresa tu contraseña'} onChange={setPassword}/>

            <CustomButton title={"Ingresar"} onPress={handleLogin}/>
            <CustomButton title={"Registrarse"} onPress={()=> {navigation.navigate("Register");}}/>
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