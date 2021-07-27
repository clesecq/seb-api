
import API from './API';

class AuthProvider {
    login({username, password}) {
        return API.login(username, password);
    }
    checkError(error) {
        return Promise.reject();
    }
    checkAuth(params) {
        return API.check();
    }
    logout() {
        return API.logout();
    }
    getPermissions(params) {
        return Promise.reject();
    }
}

export default new AuthProvider();
