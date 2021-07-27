
import _ from 'underscore';

class DataProvider {
    getList(resource, params) {
        return axios.get('/api/' + resource +
                         '?per_page=' + params.pagination.perPage +
                         '&page=' + params.pagination.page +
                         '&order_by=' + params.sort.field +
                         '&order_sort=' + params.sort.order).then(response => {
            return response.data;
        }).catch(error => {
            throw new Error(error?.message);
        });
    }

    getOne(resource, {id}) {
        return axios.get('/api/' + resource + '/' + id).then(response => {
            return response.data;
        }).catch(error => {
            throw new Error(error?.message);
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
            throw new Error(error?.message);
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
            throw new Error(error?.message);
        });
    }

    create(resource, {data}) {
        return axios.post('/api/' + resource, data).then(response => {
            return response.data;
        }).catch(error => {
            if (error?.response?.data?.message) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Unknown error");
        });
    }

    delete(resource, {id}) {
        return axios.delete('/api/' + resource + "/" + id, data).then(response => {
            return response.data;
        }).catch(error => {
            if (error?.response?.data?.message) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Unknown error");
        });
    }

    update(resource, {id, data, previousData}) {
        let diff = _.omit(data, function(v,k) { return previousData[k] === v; });
        
        return axios.put('/api/' + resource + "/" + id, diff).then(response => {
            console.log(response.data);
            return response.data;
        }).catch(error => {
            if (error?.response?.data?.message) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Unknown error");
        });
    }
}

export default new DataProvider();