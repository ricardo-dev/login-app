// arquivo para acesso a banco de dados e api
/*import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.8:8080',
});

export default api;*/
import {AsyncStorage} from 'react-native';
import {create} from 'apisauce';

const api = create({
    baseURL: 'http://192.168.1.15:8080'
});

// fica visivel o try - ctch
//api.addResponseTransform(response => {
//    if(!response.ok) throw response;
//})

// faz a autenticação sempre que fazer uma requisicao http
api.addAsyncRequestTransform(request => async () =>{
    const token = await AsyncStorage.getItem("@iLuminoApi:token");
    if(token)
        request.headers['Authorization'] = `Bearer ${token}`;
    request.headers['Content-Type','application/json']
});

export default api;


/*

*/
