import axios from 'axios'
export var address1='http://' + (window.location.host).split(':')[0] +':8080' ;

export const endpoint = (string) => {
    const data = { string: string }
    axios.post(address1 + '/endpoint', data).then((aa) => {
    //    console.log(aa)
    }).catch((aa) => { console.log('Error', aa) });
}
