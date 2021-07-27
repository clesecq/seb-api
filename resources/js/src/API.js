import axios from "axios";
import { data } from "jquery";

class API {

    constructor() {

    }

    request(endpoint, settings) {
        return new Request(this.API_BASE + endpoint, settings);
    }

    check() {
        return axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.get('/api/auth/check').then(response => {
                return Promise.resolve();
            }).catch(error => {
                return Promise.reject();
            });
        });
    }

    login(email, password) {
        return axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post('/api/auth/login', {
                'email': email,
                'password': password
            }).then(response => {
                return Promise.resolve();
            }).catch(error => {
                if (error?.response?.data?.message) {
                    throw new Error(error?.response?.data?.message);
                }
                throw new Error("Unknown error");
            });
        });
    }

    logout() {
        return axios.get('/api/auth/logout').then(response => {
            return Promise.resolve();
        }).catch(error => {
            return Promise.reject();
        });
    }
}

const api = new API();

export default api;