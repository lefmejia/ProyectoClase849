import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { navigationRef } from "../../navigation/NavigationService";
import { useTheme } from "../../contexts/ThemeContext";

export default function ProfileScreen({navigation}:any){
    const { colors } = useTheme();
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
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <CustomButton title={"Cerrar Sesion"} onPress={handleLogout}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});