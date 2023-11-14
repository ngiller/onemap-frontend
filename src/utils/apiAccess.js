import config from './config.js';
import axios from 'axios'
import router from '../router'

async function read(url, params, token) {
    let data = null
    await axios.post(config.API_URL + url, params,
        { headers: { Authorization: token }
    }).then(response => {
            data = response.data;
    }).catch(() => {
        router.push({ name: 'signout' })
    });
    return data
}

async function uploadImage(url, file, property_id, email, token) {
    let data = null
    let formData = new FormData();
    formData.append('file', file);
    formData.append('property_id', property_id);
    formData.append('email', email);
    await axios.post( config.API_URL + url,
            formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            }
        }
    ).then( response => {
        data = response.data
    }).catch((e) => {
        data = e
    });
    return data
}

export default { read, uploadImage }