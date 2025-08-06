import React, {Component} from "react"
import {View, Text, Alert, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform} from 'react-native'
import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'
import Task from "../components/Task"
import Icon from 'react-native-vector-icons/FontAwesome'
import AddTasks from './AddTask'
import axios from "axios"
import {server, showError} from '../common'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: []
}

export default class Tasklist extends Component {

    state = {
        ...initialState
    }

    componentDidMount = async () => {
      const stateString = await AsyncStorage.getItem('tasksState')
      const savedState = JSON.parse(stateString) || initialState
      this.setState({
        showDoneTasks: savedState.showDoneTasks
      }, this.filterTasks)

      this.loadTasks()
    }

    loadTasks = async() => {
        try {
            const maxDate = moment().add({days: this.props.daysAhead}).format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({tasks: res.data}, this.filterTasks)
        } catch (e) {
            showError(e)
        }
    }

    toggleFilter = () => {
        this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if(this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({visibleTasks})
        AsyncStorage.setItem('tasksState', JSON.stringify({
            showDoneTasks: this.state.showDoneTasks
        }))
    }

    toggleTask = async taskId => {
        try {
            await axios.put(`${server}/tasks/${taskId}/toggle`)
            await this.loadTasks()
        } catch (e) {
            showError(e)
        }
    }

    AddTask = async newTask => {
        if(!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return
        }

        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.date
            })
            
            this.setState({showAddTask: false}, this.loadTasks)
        } catch (e) {
            showError(e)
        }

    }

    deleteTaks = async taskId => {
        try {
            await axios.delete(`${server}/tasks/${taskId}`)
            await this.loadTasks()
        } catch (e) {
            showError(e)
        }
    }

    getImage = () => {
        switch(this.props.daysAhead) {
            case 0: return todayImage
            case 1: return tomorrowImage
            case 7: return weekImage
            default: return monthImage
        }
    }
    
    getColor = () => {
        switch(this.props.daysAhead) {
            case 0: return commonStyles.colors.today
            case 1: return commonStyles.colors.tomorrow
            case 7: return commonStyles.colors.week
            default: return commonStyles.colors.month
        }
    }

    render () {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container} >
                <AddTasks isVisible={this.state.showAddTask}  onCancel={() => this.setState({ showAddTask: false}) } onSave = {this.AddTask} />
                <ImageBackground source={this.getImage()} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='bars' size={20} color='white' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size = {20} color = {commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style= {styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subtitle}> {today} </Text>
                    </View>
                </ImageBackground>
                <View style = {styles.taskList}>
                     <FlatList data={this.state.visibleTasks} 
                        keyExtractor={item => `${item.id}`}  
                        renderItem={({item}) => <Task  {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTaks} /> }   />
                </View>
                <TouchableOpacity style={[styles.addButton, {backgroundColor: this.getColor()}]} activeOpacity={0.7} onPress={() => this.setState({showAddTask: true})}>
                    <Icon name='plus' size={20} color={commonStyles.colors.secondary}></Icon>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1
    },
    
    background: {
        flex: 3
    },

    taskList: {
        flex: 7
    },

    titleBar: {
        flex: 1,
        justifyContent: 'flex-end' 
    },

    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 50,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20
    },

    subtitle: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: commonStyles.colors.secondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginLeft: 20,
        marginBottom: 30
    },

    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 30,
        justifyContent: 'space-between',
        marginTop: 50,
        color: '#FFF'
    },

    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }

})