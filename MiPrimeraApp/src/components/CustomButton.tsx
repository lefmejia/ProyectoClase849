import { Text, TouchableOpacity, View, StyleSheet} from "react-native";

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "tertiary";
}

export default function CustomButton({title, onPress, variant="primary"}: CustomButtonProps)
{
    const styles = getStyles(variant);
    return(<TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText} >  {title} </Text>
    </TouchableOpacity>);
}

const getStyles = (variant: "primary" | "secondary" | "tertiary") => StyleSheet.create({
    button:{
        borderColor: 'navy',
        borderWidth:1,
        borderRadius: 6,
        backgroundColor: variant === "primary"? "navy" : variant === "secondary"? "gray" : "#fff",
        padding:12,
        width:150
    },
    buttonText:{
        color: variant === "primary"? "#fff" : variant === "secondary"? "#fff" : "#000",
    }
});