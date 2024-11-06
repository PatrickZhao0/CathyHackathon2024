import axios from 'axios'

const GlobalUrl = 'http://localhost:8081'
export async function requestGet({url, errfn}) {

    const config = {
        headers: {}
    };
    config.headers["Content-Type"] = 'application/json';

    try {
        const response = await axios.get(GlobalUrl + url, config);
        return response.data
    } catch (error) {
        errfn && errfn(error);
        throw new Error(error);
    }
}