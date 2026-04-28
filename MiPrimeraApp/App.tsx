import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './src/components/CustomButton';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Mi primera app</Text>
      <StatusBar style="auto" />
      <CustomButton title={"App"} onPress={()=>{console.log('Boton 1 presionado')}}></CustomButton>
      <CustomButton title={"Secondary button"} onPress={()=>{console.log('Boton 2 presionado')}}></CustomButton>
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
