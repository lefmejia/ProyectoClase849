import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useState } from 'react';

export default function RegisterScreen ()
{
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <Text>Mi primera app</Text>
      <StatusBar style="auto" />
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

      <CustomInput 
      type='number'
      value= {name} 
      onChange={setName}
      placeholder={'Ingresa tu numero de telefono'}
      />
      <CustomButton title={"App"} onPress={()=>{console.log('Boton 1 presionado')}}></CustomButton>
      <CustomButton title={"Secondary button"} 
                    onPress={()=>{console.log('Boton 2 presionado')}}
                    variant='tertiary'></CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d29d9d',
    alignItems: 'center',
    justifyContent: 'center',
  },
});