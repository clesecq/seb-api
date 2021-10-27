
class AuthProvider {
    /**
     * Authenticates an user
     */
    login({ user }) {
        let data = user;
        data["fullName"] = data.email;
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('logged', "1");
        return Promise.resolve();
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
     * Updates the email of the user in the localstorage
     */
    updateEmail(newEmail) {
        if (localStorage.getItem('user')) {
            const data = JSON.parse(localStorage.getItem('user'));
            data.email = newEmail;
            data.fullName = newEmail;
            localStorage.setItem('user', JSON.stringify(data));
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    }

    /**
     * Check if the error is an authentication error
     */
    checkError(error) {
        const status = error?.status;
        if (status === 401 || status === 403 || error.message === "Unauthenticated.") {
            localStorage.setItem('logged', "0");
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
            return axios.get('/api/profile/me').then(response => {
                let data = response.data.data;
                data["fullName"] = data.email;
                localStorage.setItem('user', JSON.stringify(data));
                return Promise.resolve();
            }).catch(error => {
                console.log(error);
                localStorage.setItem('logged', "0");
                localStorage.removeItem('user');
                return Promise.reject(error);
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
