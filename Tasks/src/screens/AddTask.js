import React, {Component} from 'react'
import {Modal, Platform ,StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity, TextInput, View} from 'react-native'
import commonStyles from '../commonStyles'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

const initialState = {desc: '', date: new Date(), showDatePicker: false}

export default class AddTask extends Component {

    state = {
        ...initialState
    }

    save = () => {
        const newTask = {
            desc: this.state.disc,
            date: this.state.date
        }

        this.props.onSave && this.props.onSave(newTask)

        this.setState({...initialState})
    } 

    getDatePicker = () => {
        let datePicker = <DateTimePicker value={this.state.date} 
            onChange={(_, date) => this.setState({date, showDatePicker: false})} mode='date'  />

        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY').replace(/^./, (match) => match.toUpperCase());


        if(Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                        <View style={styles.dateButton}>
                            <Text style={styles.dateText}>
                                {dateString}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker
    }

    render() {
        return(
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType='slide'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.input} placeholder='Descrição da Tarefa' onChangeText={desc => this.setState({desc})} value={this.state.desc} />
                    {this.getDatePicker()}   
                    <View style={styles.buttons}>

                        <TouchableOpacity onPress={this.props.onCancel} >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.onSave({desc: this.state.desc, date: this.state.date})} >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Salvar</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )  
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },

    container: {
        backgroundColor: '#FFF',
    },

    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: '#333',
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18,
        textTransform: 'uppercase',
        letterSpacing: 1
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10
    },

    input: {
        fontFamily: commonStyles.fontFamily,
        height: 50,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#b1b1b1ff',
        borderRadius: 10
    },

    button: {
        backgroundColor: '#333',
        borderRadius: 10,
        margin: 30,
        paddingHorizontal: 30,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: commonStyles.fontFamily,
    },

    dateButton: {
        marginLeft: '20%',
        width: '60%',
        height: 35,
        backgroundColor: '#333',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20      
    },


    dateText: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 17,
        color: '#FFF',
    }

})