import axios from "axios";

class WelcomeMessageService {
    getWelcomeMessage(name) {
        let username = 'user';
        let password = 'test';

        //windows btoa ecodes the credentials using base64 (base 64 encoding)
        let basicAuthHeader = 'Basic ' + window.btoa(`${username}:${password}`);
        //let basicAuthHeader = 'Basic dXNlcjp0ZXN0';
        console.log(basicAuthHeader);

        return axios.get('http://localhost:8080/welcome/message/in28minutes',
            {
                headers: {
                    'Authorization': basicAuthHeader,
                }
            }
        );
    }
}

export default new WelcomeMessageService();