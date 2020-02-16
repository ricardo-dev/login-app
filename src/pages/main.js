import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ToastAndroid, AsyncStorage,StyleSheet, Platform, Alert } from 'react-native';
import {Header, Left, Right, Body, Container, Content} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import {StackActions, NavigationActions} from 'react-navigation';

export default class Main extends Component{

    static navigationOptions = {
        header:null
    }

    state = {
        nomeUsuario: null,
    }

    logout = async () => {
        //ToastAndroid.show('Sair', ToastAndroid.SHORT);
        await AsyncStorage.multiSet([
            ['@iLuminoApi:token', ''],
            ['@iLuminoApi:nomeUsuario', '']
        ]);
        //this.props.navigation.goBack() // código para voltar a tela anterior

        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Login'})
          ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    async componentDidMount(){
        const nome = await AsyncStorage.getItem("@iLuminoApi:nomeUsuario");
        this.setState({nomeUsuario: nome})
    }

    requisicaoGet = async () => {
        const response = await api.get(
            '/api/usuario/usuario-id/1'
        )

        if(response.ok){
            Alert.alert('Ok!');
        }else{
            Alert.alert(response.data.error);
        }
    }


    render(){
        return(
            <Container>
                <Header style={styles.androidHeader}
                        androidStatusBarColor="#fff" iosBarStyle="dark-content">
                    <Right style={{flex:1}}>
                        <Icon name="sign-out" size={23} color="#333"
                            onPress={
                                this.logout
                            }/>
                    </Right>
                </Header>
                <Content>
                <Text>MainScreen</Text>
                <Text>{this.state.nomeUsuario}</Text>

                <TouchableOpacity
                    onPress={
                        this.requisicaoGet
                    }>
                    <Text>Buscar</Text>
                </TouchableOpacity>
                </Content>
            </Container>
           /* <View>
                <Text>MainScreen</Text>
                <TouchableOpacity
                    onPress={
                        ()=>{
                            ToastAndroid.show('Sair', ToastAndroid.SHORT);
                            this.props.navigation.goBack()
                        }
                    }
                    >
                    <Text>Sair</Text>
                </TouchableOpacity>
            </View>*/
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    androidHeader: {
      ...Platform.select({
      android: {
        //marginTop: StatusBar.currentHeight,
        //StatusBarsetBackgroundColor("#D3D3D3"),
        //StatusBarsetBarStyle("dark-content"),
        backgroundColor: 'white',
        //StatusBarColor
        //StatusBar
       }
      }) },
    androidHeaderTitle: {
      ...Platform.select({
        android: {
          alignItems: 'flex-end',
          //textAlign: 'center',
          //flex: 1
         }
        })
    },
  });
