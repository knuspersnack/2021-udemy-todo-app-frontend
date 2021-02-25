import axios from "axios";

class WelcomeMessageService {
    getWelcomeMessage(name) {
        return axios.get(`http://localhost:8080/welcome/message/${name}`);
    }
}

export default new WelcomeMessageService();