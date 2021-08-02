
class AuthProvider {
    /**
     * Authenticates an user
     */
    login({ email, password }) {
        return axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post('/login', {
                'email': email,
                'password': password
            }).then(response => {
                let data = response.data.user;
                data["fullName"] = data.email;
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('logged', "1");
                return Promise.resolve();
            }).catch(error => {
                if (error?.response?.data?.message) {
                    throw new Error(error?.response?.data?.message);
                }
                throw new Error("Unknown error");
            });
        });
    }

    /**
     * Gets the identity of an user
     */
    getIdentity() {
        if (localStorage.getItem('user')) {
            return Promise.resolve(JSON.parse(localStorage.getItem('user')));
        } else {
            return Promise.reject();
        }
    }

    /**
     * Check if the error is an authentication error
     */
    checkError(error) {
        if (status === 401 || status === 403 || error.message === "Unauthenticated.") {
            localStorage.removeItem('user');
            return Promise.reject();
        }
        return Promise.resolve();
    }

    /**
     * Check if we are authenticated
     */
    checkAuth(params) {
        if (localStorage.getItem('user')) {
            return Promise.resolve();
        } else if (localStorage.getItem('logged') === "0") {
            return Promise.reject();
        } else {
            return axios.get('/api/user').then(response => {
                let data = response.data;
                data["fullName"] = response.data.email;
                localStorage.setItem('user', JSON.stringify(data));
                return Promise.resolve();
            }).catch(error => {
                localStorage.setItem('logged', "0");
                return Promise.reject();
            });
        }
    }

    /**
     * Log out
     */
    logout() {
        return axios.post('/logout').then(response => {
            localStorage.removeItem('user');
            localStorage.setItem('logged', "0");
            return Promise.resolve();
        }).catch(error => {
            return Promise.reject();
        });
    }

    /**
     * Get a list of the permissions
     */
    getPermissions(params) {
        if (localStorage.getItem('user')) {
            return Promise.resolve(JSON.parse(localStorage.getItem('user'))["permissions"]);
        } else {
            return Promise.resolve([]);
        }
    }
}

export default new AuthProvider();
