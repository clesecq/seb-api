
import _ from 'underscore';

class DataProvider {
    getList(resource, params) {
        let filter = "";
        for(let key in params.filter) {
            if (params.filter[key] === true) params.filter[key] = 1;
            if (params.filter[key] === false) params.filter[key] = 0;

            filter += "&filter[" + encodeURIComponent(key) + "]=" + encodeURIComponent(params.filter[key]);
        }

        return axios.get('/api/' + resource +
                         '?per_page=' + params.pagination.perPage +
                         '&page=' + params.pagination.page +
                         '&order_by=' + params.sort.field +
                         '&order_sort=' + params.sort.order +
                         filter).then(response => {
            return response.data;
        }).catch(error => {
            if (error?.response?.data?.message) {
                return Promise.reject(new Error(error?.response?.data?.message));
            }
            return Promise.reject(new Error(error?.message));
        });
    }

    getOne(resource, {id}) {
        return axios.get('/api/' + resource + '/' + id).then(response => {
            return response.data;
        }).catch(error => {
            if (error?.response?.data?.message) {
                return Promise.reject(new Error(error?.response?.data?.message));
            }
            return Promise.reject(new Error(error?.message));
        });
    }

    getMany(resource, {ids}) {
        let parameters = "";
        for(let i = 0; i < ids.length; i++) {
            if (i == 0) {
                parameters += "?ids[]=" + ids[i];
            } else {
                parameters += "&ids[]=" + ids[i];
            }
        }

        return axios.get('/api/' + resource + parameters).then(response => {
            return response.data;
        }).catch(error => {
            if (error?.response?.data?.message) {
                return Promise.reject(new Error(error?.response?.data?.message));
            }
            return Promise.reject(new Error(error?.message));
        });
    }

    deleteMany(resource, {ids}) {
        let parameters = "";
        for(let i = 0; i < ids.length; i++) {
            if (i == 0) {
                parameters += "?ids[]=" + ids[i];
            } else {
                parameters += "&ids[]=" + ids[i];
            }
        }

        return axios.delete('/api/' + resource + parameters).then(response => {
            return response.data;
        }).catch(error => {
            if (error?.response?.data?.message) {
                return Promise.reject(new Error(error?.response?.data?.message));
            }
            return Promise.reject(new Error(error?.message));
        });
    }

    create(resource, {data}) {
        return axios.post('/api/' + resource, data).then(response => {
            return response.data;
        }).catch(error => {
            if (error?.response?.data?.message) {
                return Promise.reject(new Error(error?.response?.data?.message));
            }
            return Promise.reject(new Error(error?.message));
        });
    }

    delete(resource, {id}) {
        return axios.delete('/api/' + resource + "/" + id).then(response => {
            return response.data;
        }).catch(error => {
            if (error?.response?.data?.message) {
                return Promise.reject(new Error(error?.response?.data?.message));
            }
            return Promise.reject(new Error(error?.message));
        });
    }

    update(resource, {id, data, previousData}) {
        let diff = _.omit(data, function(v,k) { return previousData[k] === v; });
        
        return axios.put('/api/' + resource + "/" + id, diff).then(response => {
            return response.data;
        }).catch(error => {
            if (error?.response?.data?.message) {
                return Promise.reject(new Error(error?.response?.data?.message));
            }
            return Promise.reject(new Error(error?.message));
        });
    }

    updateMany(resource, {ids, data}) {
        let parameters = "";
        for(let i = 0; i < ids.length; i++) {
            if (i == 0) {
                parameters += "?ids[]=" + ids[i];
            } else {
                parameters += "&ids[]=" + ids[i];
            }
        }

        return axios.put('/api/' + resource + parameters, data).then(response => {
            return response.data;
        }).catch(error => {
            if (error?.response?.data?.message) {
                return Promise.reject(new Error(error?.response?.data?.message));
            }
            return Promise.reject(new Error(error?.message));
        });
    }
}

export default new DataProvider();