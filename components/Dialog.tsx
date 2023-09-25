import React from 'react';
import { StyleSheet, Modal, View, Text } from 'react-native';

export const Dialog = ({ children, open }: any) => (
    <Modal visible={open} animationType="fade" transparent={true}>
        <View style={styles.modalView}>
            <View style={styles.container} >
                {children}
            </View>
        </View>
    </Modal>
)
export const DialogTitle = ({ children, style }: any) => (
    <View style={[styles.modalTitle, style]}>
        {children}
    </View>
)
export const DialogContent = ({ children, style }: any) => (
    <View style={[styles.modalContent, style]}>
        {children}
    </View>
)
export const DialogActions = ({ children, style }: any) => (
    <View style={[styles.modalActions, style]}>
        {children}
    </View>
)

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        display: 'flex',
        color: 'white',
        maxWidth: '80%',
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        borderRadius: 5,
        backgroundColor: 'red'
    },
    modalView: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    alert: {
        width: '100%',
        maxWidth: 300,
        margin: 48,
        elevation: 24,
        borderRadius: 2,
        color: 'white',
        backgroundColor: '#fff'
    },
    modalTitle: {
        backgroundColor: '#2D2C2C',
        padding: 20,
        paddingBottom: 10,
    },
    modalContent: {
        backgroundColor: '#2D2C2C',
        paddingTop: 0,
        padding: 20,
    },
    modalActions: {
        backgroundColor: '#987451',
        padding: 20,
    },
});