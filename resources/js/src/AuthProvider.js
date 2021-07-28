
class AuthProvider {
    /**
     * Authenticates an user
     */
    login({username, password}) {
        return axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post('/api/auth/login', {
                'email': username,
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

    /**
     * Gets the identity of an user
     */
    getIdentity() {
        return axios.get('/api/user').then(response => {
            let out = {
                "id": response.data.id,
                "fullName": response.data.email
            };
            return out;
        }).catch(error => {
            if (error?.response?.data?.message) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Unknown error");
        });
    }

    /**
     * Check if the error is an authentication error
     */
    checkError(error) {
        if (status === 401 || status === 403) {
            return Promise.reject();
        }
        return Promise.resolve();
    }

    /**
     * Check if we are authenticated
     */
    checkAuth(params) {
        return axios.get('/api/auth/check').then(response => {
            return Promise.resolve();
        }).catch(error => {
            return Promise.reject();
        });
    }

    /**
     * Log out
     */
    logout() {
        return axios.get('/api/auth/logout').then(response => {
            return Promise.resolve();
        }).catch(error => {
            return Promise.reject();
        });
    }

    /**
     * Get a list of the permissions
     */
    getPermissions(params) {
        return Promise.resolve();
    }
}

export default new AuthProvider();
