import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';

type Props = {
    text: string;
};

export default function Tooltip({ text }: Props) {
    const [visible, setVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity style={styles.icon} onPress={() => setVisible(true)}>
                <Text style={styles.iconText}>i</Text>
            </TouchableOpacity>

            <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
                <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
                    <View style={styles.bubble}>
                        <Text style={styles.bubbleText}>{text}</Text>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: 'navy',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6,
    },
    iconText: {
        fontSize: 11,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'navy',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    bubble: {
        backgroundColor: '#fff',
        borderWidth: 1.5,
        borderColor: 'navy',
        borderRadius: 10,
        padding: 16,
    },
    bubbleText: {
        fontSize: 14,
        color: '#000',
        lineHeight: 21,
    },
});
