import { View, Text } from "react-native";
import CustomButton from "../../components/CustomButton";
import { navigationRef } from "../../navigation/NavigationService";

export default function ProfileScreen({navigation}:any){
    const handleLogout = () => {
       if(navigationRef.isReady()){
            navigationRef.reset({
                //indice del arreglo routes, que indica la vista actual al momento reset el stack de navegacion
                index: 0, 
                //es un arreglo de objetos, para el cual cada objeto representa una ruta en el nuevo historial del stack
                routes: [{name: 'Login'}],
            })
       }

        
    }
    const handleGoToLogin = () =>{
        navigation.navigate('Login');
    }
    return(
        <View>
            <Text> Bienvenido a Profile</Text>
            <CustomButton title={"Cerrar Sesion"} onPress={handleLogout}/>
            <CustomButton title={"Ir a Login"} onPress={handleGoToLogin}/>
        </View>
    )
}