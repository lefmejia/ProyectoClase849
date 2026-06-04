import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet, Dimensions } from 'react-native';

const BUBBLE_WIDTH = 260;
const SCREEN_WIDTH = Dimensions.get('window').width;
const EDGE_MARGIN = 12;

type Props = {
    text: string;
};

export default function Tooltip({ text }: Props) {
    const [visible, setVisible] = useState(false);
    const [bubbleTop, setBubbleTop] = useState(0);
    const [bubbleLeft, setBubbleLeft] = useState(0);
    const [triangleLeft, setTriangleLeft] = useState(0);
    const iconRef = useRef<any>(null);

    const handlePress = () => {
        iconRef.current?.measure((_x: number, _y: number, width: number, height: number, pageX: number, pageY: number) => {
            const iconCenterX = pageX + width / 2;
            let left = iconCenterX - BUBBLE_WIDTH / 2;
            left = Math.max(EDGE_MARGIN, Math.min(left, SCREEN_WIDTH - BUBBLE_WIDTH - EDGE_MARGIN));
            const tLeft = Math.max(4, Math.min(iconCenterX - left - 9, BUBBLE_WIDTH - 22));
            setBubbleTop(pageY + height + 4);
            setBubbleLeft(left);
            setTriangleLeft(tLeft);
            setVisible(true);
        });
    };

    return (
        <View>
            <TouchableOpacity ref={iconRef} style={styles.icon} onPress={handlePress}>
                <Text style={styles.iconText}>i</Text>
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
                    <Pressable
                        style={[styles.bubbleContainer, { top: bubbleTop, left: bubbleLeft }]}
                        onPress={() => {}}
                    >
                        <View style={[styles.triangle, { marginLeft: triangleLeft }]} />
                        <View style={styles.bubble}>
                            <Text style={styles.bubbleText}>{text}</Text>
                        </View>
                    </Pressable>
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
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    bubbleContainer: {
        position: 'absolute',
        width: BUBBLE_WIDTH,
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 9,
        borderRightWidth: 9,
        borderBottomWidth: 11,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'navy',
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
