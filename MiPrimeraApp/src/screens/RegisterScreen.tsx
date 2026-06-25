import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterScreen ({navigation}:any)
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { colors } = useTheme();
  const {register} = useAuth();

  const handleRegister = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Campos requeridos", "Ingresa tu correo y contraseña.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Contraseña inválida", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const { success, hasSession } = await register(email.trim(), password, {
      name: name.trim()
    });

    if (!success) return;

    if (hasSession) {
      navigation.navigate("MainTabs");
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomInput 
      type={'email'}
      value= {email} 
      onChange={setEmail}
      />
      <CustomInput 
      type={'password'}
      value= {password} 
      onChange={setPassword}
      />

      <CustomInput 
      value= {name} 
      onChange={setName}
      placeholder={'Ingresa tu nombre'}
      />
      <CustomButton title={"Registrarme"} onPress={handleRegister}/>
      <CustomButton title={"Volver a Login"} onPress={() => {navigation.navigate("Login");}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});