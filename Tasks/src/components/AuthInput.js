import React from "react";
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {
    return (
        <View style={[]}>
            <Icon name={props.icon} size={20} style={styles.icon} />
            <TextInput {...props}  style={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor: '#EEE',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        color: '#333',
        opacity: 0.8,
        bottom: -30,
        zIndex: 3,
        marginLeft: 37
    },
    input: {
        marginLeft: 20,
        paddingHorizontal: 45,
        padding: 10,
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 20
    }
})