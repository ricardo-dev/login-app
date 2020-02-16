import React, {Component} from 'react';
import {View,
        Text,
        TouchableOpacity,
        TextInput,
        ToastAndroid,
        AsyncStorage,
        Alert
    } from 'react-native';
import api from '../services/api';
import {StackActions, NavigationActions} from 'react-navigation';

export default class Login extends Component{


    static navigationOptions = {
        header:null,
    }

    state = {
        Login: '',
        Senha: '',
        errorMessage: null,
    }

    entradaLogin = text => {
        this.setState({Login: text});
    }

    entradaSenha = text => {
        this.setState({Senha: text});
    }

    redirecionar = ()=>{
        //this.props.navigation.navigate('Main'); // direciona para proxima tela


        // código para ir para proxima tela zerando o fluxo de navegacao
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Main'})
          ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    async componentDidMount(){
        const token = await AsyncStorage.getItem('@iLuminoApi:token');
        if(token){
            this.redirecionar();
        }
    }

    funcaoLogin = async () => {
        const { Login, Senha } = this.state;
        if(Login.length == 0 || Senha.length == 0){
            ToastAndroid.show('Error - campo(s) vazio', ToastAndroid.SHORT);
        } else {
            const response = await api.post(
                '/auth/',            // url
                {
                    celular:Login,
                    senha:Senha
                },
                Headers= {
                    "Content-Type":"application/json"
                }
            );

            if(response.ok){
                this.setState({ errorMessage: null })
                //ToastAndroid.show("Ok", ToastAndroid.SHORT);
                Alert.alert('Login com sucesso!');
                const Token = response.data.data.token;
                const nomeUsuario = response.data.data.nome;
                await AsyncStorage.multiSet([
                    ['@iLuminoApi:token', Token],
                    ['@iLuminoApi:nomeUsuario', nomeUsuario]
                ]);
                this.redirecionar()
            }else{
                //ToastAndroid.show("Error Login", ToastAndroid.SHORT);
                this.setState({ errorMessage: " Dados não encontrados!"})
            }
        }
    }

    /*funcaoLogin = async () => {

        const {Login, Senha} = this.state;

        if(Login.length == 0 || Senha.length == 0){
            ToastAndroid.show('Error - login ou senha vazio', ToastAndroid.SHORT);
        }else{
            const response = await api.post(
                '/auth',
                {
                    "celular":Login,
                    "senha":Senha,
                },
                Headers={
                    "Content-Type":"application/json"
                }
            );
            console.log(response);

            if(response.data.data.token.length > 0){
                ToastAndroid.show('Ok', ToastAndroid.SHORT)
            } else {
                ToastAndroid.show('Error', ToastAndroid.SHORT)
            }
        }
    }*/

    render(){
        return(

            <View style={{
                flex:1,
                backgroundColor:'#f2f2f2'
            }}>
                <View style={{
                    flex:1,
                    justifyContent:'center',

                    padding:30,
                }}>
                <View>
                <TextInput style={{
                      borderWidth: 1,
                      borderColor: "#DDD",
                      backgroundColor: 'white',
                      borderRadius:10,
                      marginVertical:5,
                      paddingLeft:10
                    }}
                      placeholder="Digite telefone"
                      value={this.state.Login}
                      onChangeText={this.entradaLogin}
                      keyboardType="phone-pad"/>
                <TextInput style={{
                      borderWidth: 1,
                      borderColor: "#DDD",
                      backgroundColor: 'white',
                      borderRadius:10,
                      marginVertical:5,
                      paddingLeft:10
                    }}
                      placeholder="Digite senha"
                      value={this.state.Senha}
                      onChangeText={this.entradaSenha}
                      keyboardType="default"
                      secureTextEntry={true}
                      returnKeyType="send"
                      onSubmitEditing={this.funcaoLogin}/>
                </View>
                {!!this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
                <TouchableOpacity
                    onPress={
                        this.funcaoLogin
                    }>
                    <View style={{
                        backgroundColor:'white',
                        borderRadius:10,
                        borderWidth:1,
                        borderColor:'#DDD',
                        marginVertical:10,
                        height:50,
                        alignItems:'center',
                        justifyContent:'center',
                        }}>
                          <Text style={{color:'#333', fontWeight:'bold', fontSize:18}}>Logar</Text>
                        </View>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
}
