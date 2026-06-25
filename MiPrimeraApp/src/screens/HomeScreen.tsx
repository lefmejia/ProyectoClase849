import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../contexts/AuthContext";
import { TabsParamList } from "../navigation/TabsNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import OrderCard from "../components/OrderCard";
import { useTheme } from "../contexts/ThemeContext";
import { ThemeColors } from "../utils/types/ThemeColors";
import { useEffect } from "react";
import { fetchCustomers } from "../store/slices/customerProfileSlice";
import { fetchOrders } from "../store/slices/orderSlice";

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabsParamList, 'Home'>,
    NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({route, navigation}: Props)
{
    const {user} = useAuth();
    const { colors } = useTheme();
    const styles = getStyles(colors);
    const dispatch = useAppDispatch();
    const orders = useAppSelector((state) => state.orders.orders);
    const pendingOrders = orders.filter((o) => o.estado === "pendiente");
    const completedOrders = orders.filter((o) => o.estado === "completada");
    const inProgressOrders = orders.filter((o) => o.estado === "en progreso");
    const customers = useAppSelector((state) => state.customers.customers);

    useEffect(() => {
        dispatch(fetchCustomers());
        dispatch(fetchOrders());
    }, [dispatch]);

    const goToAddCustomer = () => {
        navigation.navigate('AddCustomer');
    };

    const goToAddOrder = () => {
        navigation.navigate('AddOrder');
    };

    const getCustomerName = (customerId: number):string => {
        const index = customers.findIndex((c) => c.id === customerId);
        if(index !== -1){
            return customers[index].nombre;
        };
        return "";
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection:"row"}}>
            <CustomButton title={"Crear cliente"} onPress={goToAddCustomer}/>
            <CustomButton title={"Crear orden"} onPress={goToAddOrder}/>
            </View>
            <Text style={styles.sectionTitle}>Ordenes pendientes</Text>
            <View>
                {pendingOrders.length === 0 ? (
                    <Text style={styles.emptyText}>No hay ordenes pendientes</Text>
                ) : (
                    pendingOrders.map((order)=>(
                        <OrderCard
                            key={order.id}
                            customerName={getCustomerName(order.customerId)}
                            tipoRopa={order.tipoRopa}
                            fechaEntrega={order.fechaEntrega}
                            estado={order.estado}
                            onPress={() => navigation.navigate('OrderDetail', { orderId: order.id! })}/>
                    ))
                )}
            </View>
            <Text style={styles.sectionTitle}>Ordenes en progreso</Text>
            <View>
                {inProgressOrders.length === 0 ? (
                    <Text style={styles.emptyText}>No hay ordenes en progreso</Text>
                ) : (
                    inProgressOrders.map((order)=>(
                        <OrderCard
                            key={order.id}
                            customerName={getCustomerName(order.customerId)}
                            tipoRopa={order.tipoRopa}
                            fechaEntrega={order.fechaEntrega}
                            estado={order.estado}
                            onPress={() => navigation.navigate('OrderDetail', { orderId: order.id! })}/>
                    ))
                )}
            </View>
            <Text style={styles.sectionTitle}>Ordenes completadas</Text>
            <View>
                {completedOrders.length === 0 ? (
                    <Text style={styles.emptyText}>No hay ordenes completadas</Text>
                ) : (
                    completedOrders.map((order)=>(
                        <OrderCard
                            key={order.id}
                            customerName={getCustomerName(order.customerId)}
                            tipoRopa={order.tipoRopa}
                            fechaEntrega={order.fechaEntrega}
                            estado={order.estado}
                            onPress={() => navigation.navigate('OrderDetail', { orderId: order.id! })}/>
                    ))
                )}
            </View>
        </View>
    );
}

const getStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.background,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
        marginTop: 12,
        marginBottom: 8,
    },
    emptyText: {
        color: colors.textSecondary,
    },
});