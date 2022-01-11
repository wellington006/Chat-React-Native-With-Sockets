import React, { Component } from 'react'
import { ScrollView, Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'

import socketIOClient from "socket.io-client"       // OBS: Não utilizar localhost
const socket = socketIOClient('http://localhost:1000') // Coloque o IP da sua máquina. EX: http://192.000.122.2:1000

import styles from './styles.js'

import MessageSender from '../../components/MessageSender.js'
import MessageReceiver from '../../components/MessageReceiver.js'

const initialState = {
    user: '',
    messages: [],
    message: '', 
    previousMessageAlreadyGetted: true,

    modalVisibility: true
}


class App extends Component {
    state = { ...initialState }

    componentDidMount() {

        if (this.state.previousMessageAlreadyGetted) {
            this.setState({ previousMessageAlreadyGetted: false })

            socket.on('previousMessage', (messages) => {
                this.setState({ messages })
            })
        }

        socket.on('receivedMessage', message => {
            // console.log('receivedMessage: ' + message)
            let messages = [...this.state.messages]
            messages.push(message)

            console.log(messages)

            this.setState({ messages })
        })
    }

    setUser = () => {
        if (this.state.user) {
            AsyncStorage.setItem('user', this.state.user)
            this.setState({ modalVisibility: false })
        }
    }

    renderMessages = () => {
        return (
            this.state.messages.map(msg => {
                if (msg.author === this.state.user) {
                    return <MessageSender textMessage={msg.message} />
                } else {
                    return <MessageReceiver textMessage={msg.message} />
                }
            })
        )
    }

    sendMessage = () => {
        if (this.state.message) {
            let messages = [...this.state.messages]

            let message = {
                id: `${Math.random()}`,
                message: this.state.message,
                author: this.state.user
            }

            messages.push(message)
            socket.emit('sendMessage', message)

            this.setState({ messages: messages, message: '' })
        }
    }

    scroolView = () => {
        this.refs.flat.scrollToEnd({ animated: true })
    }

    render() {
        return (
            <View style={styles.container}>

                <Modal visible={this.state.modalVisibility}
                    animationType='slide' transparent={true}
                    style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.offset}></View>
                        <View style={styles.addUser}>
                            <Text style={styles.modalTitle}>Informe seu nome</Text>
                            <TextInput value={this.state.user}
                                onChangeText={name => this.setState({ user: name })}
                                style={styles.nameInput}>
                            </TextInput>
                            <TouchableOpacity style={styles.button} onPress={this.setUser}>
                                <Text style={styles.buttonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.offset}></View>
                    </View>
                </Modal>

                <StatusBar style="auto" />

                <View style={styles.displayMessages}>
                    <ScrollView ref={'flat'} onContentSizeChange={this.scroolView}>
                        {this.renderMessages()}
                    </ScrollView>
                </View>

                <View style={styles.inputArea}>
                    <TextInput placeholder='Digite uma mensagem...' style={styles.inputMessage}
                        onFocus={this.scroolView}
                        onChangeText={message => this.setState({ message })}
                        keyboardType='default' value={this.state.message}>
                    </TextInput>

                    <TouchableOpacity style={styles.sendButton} onPress={this.sendMessage}>
                        <Icon style={styles.sendIcon} name='arrow-right' size={25} color='#000' />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default App

