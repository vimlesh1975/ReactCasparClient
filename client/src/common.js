import axios from 'axios'

export const endpoint = (string) => {
    const data = { string: string }
    axios.post('http://localhost:8080/endpoint', data).then((aa) => {
        // console.log('success', aa)
    }).catch((aa) => { console.log('Error', aa) });
}

