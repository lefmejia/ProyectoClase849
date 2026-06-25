import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, KeyboardTypeOptions} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useTheme } from "../contexts/ThemeContext";
import { ThemeColors } from "../utils/types/ThemeColors";

type Props = {
    type?: "text" | "email" | "password" | "number" | "decimal" | "calendar";
    placeholder?: string;
    value?: string;
    onChange: (text:string)=> void;
}

const parseDate = (text: string): Date => {
    const [year, month, day] = text.split('-').map(Number);
    if (day && month && year) return new Date(year, month - 1, day);
    return new Date();
}

const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
}

export default function CustomInput ({type, placeholder="", value="", onChange}:Props){
    const { colors } = useTheme();
    const styles = getStyles(colors);
    const [isSecureText, setIsSecureText] = useState(type ==='password');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const isPasswordField = type ==='password';
    const isCalendarField = type === 'calendar';

    const icon : typeof MaterialIcons["name"] | undefined =
        type === "email"? 'alternate-email' : type === "password" ? 'lock' : type === "calendar" ? 'event' : undefined

    const keyboardType: KeyboardTypeOptions =
        type === "email"? 'email-address' :
            type === "number" ? 'phone-pad':
                type === "decimal" ? 'decimal-pad':
                    'default';

    const getError = () => {
        if(type === 'email' && !value.includes('@')) return 'Correo invalido';
        if (type === 'password' && value.length < 4) return 'La contraseña es muy debil';
        if (type === 'number' && (value.length != 8 || value.includes('-'))) return 'Numero de telefono invalido';
    }

    const error = isTouched ? getError() : undefined;

    const handleChangeText = (text: string) => {
        setIsTouched(true);
        onChange(text);
    }

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (event.type === 'set' && selectedDate) {
            onChange(formatDate(selectedDate));
        }
    }

    return (
        <View style={styles.wrapper}>
        <View style={[styles.inputContainer, error && styles.inputError]}>
            <MaterialIcons name={icon as any} size={22} color={colors.textSecondary}/>
            { isCalendarField ? (
                <TouchableOpacity style={styles.dateTouchable} onPress={() => setShowDatePicker(true)}>
                    <Text style={value ? styles.dateText : styles.datePlaceholder}>
                        {value || placeholder}
                    </Text>
                </TouchableOpacity>
            ) : (
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={colors.textSecondary}
                    value={value}
                    onChangeText={handleChangeText}
                    style={styles.input}
                    secureTextEntry={isSecureText}
                    keyboardType={keyboardType}
                />
            )}


            { isPasswordField && <TouchableOpacity

            onPress={
                ()=>{
                    setIsSecureText(!isSecureText);
                }
            }
            >
                <Ionicons name={isSecureText? "eye" : "eye-off"} size={15} color={colors.textSecondary}/>
            </TouchableOpacity> }
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        { isCalendarField && showDatePicker && (
            <DateTimePicker
                value={value ? parseDate(value) : new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
            />
        )}
        </View>
    );
}

const getStyles = (colors: ThemeColors) => StyleSheet.create({
    wrapper:{
        marginBottom:10
    },
    inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius:9,
        backgroundColor: colors.inputBackground,
        marginTop: 10
    },
    input:{
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: colors.text,
    },
    dateTouchable: {
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    dateText: {
        color: colors.text,
    },
    datePlaceholder: {
        color: colors.textSecondary,
    },
    inputError : {
        borderColor: colors.error,
    },
    errorText: {
        color: colors.error,
    }
});