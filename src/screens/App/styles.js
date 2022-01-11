import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    modalContainer: {
        flex: 1,
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    addUser: {
        backgroundColor: '#228AB5',
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 17,
        color: 'white'
    },
    nameInput: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'white',
        fontSize: 20,
        color: 'white',
        paddingLeft: 8,
        width: '70%',
        padding: 10
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
        backgroundColor: 'skyblue',
        width: 80,
        height: 30,
        marginBottom: 10,
        borderWidth: 4,
        borderColor: 'white'
    },
    buttonText: {
        color: 'white',
        padding: 10
    },

    displayMessages: {
        flex: 9,
        borderWidth: 1,
        borderColor: 'ghostwhite',
        borderRadius: 5,
        padding: 10
    },
    inputArea: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    },
    inputMessage: {
        flex: 1,
        marginVertical: 30,
        fontSize: 18,
        height: 50,
        width: 50,
        borderRadius: 10,
        marginRight: 8,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderRadius: 30,
        backgroundColor: 'black'
    },
    sendIcon: {
        color: 'white'
    }
});

export default styles