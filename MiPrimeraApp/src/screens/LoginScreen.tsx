import { View } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen ({navigation}:any)
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth();

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
        <View>
            <CustomInput placeholder={'Ingresa tu correo'} value={email} onChange={setEmail}/>

            <CustomInput type={'password'} value={password} placeholder={'Ingresa tu contraseña'} onChange={setPassword}/>

            <CustomButton title={"Ingresar"} onPress={handleLogin}/>
        </View>
    );
}