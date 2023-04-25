const { MosConnection, ConnectionConfig, xml2js } = require('@mos-connection/connector')

const mos = new MosConnection(
    new ConnectionConfig({
        mosID: 'mosID_RCC',
        acceptsConnections: true,
        profiles: {
            '0': true,
            '1': true,
            '2': true,
            '4': true
        },
        openRelay: true,
        debug: false
    })
)

mos.on('rawMessage', (_source, _type, _message) => {
    if (!(_message.includes('From'))) {

        const dd = `<?xml version="1.0" encoding="utf-32BE"?><mos xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><mosID>mosID_RCC</mosID><ncsID>NCS_RCC</ncsID><messageID>333</messageID><heartbeat><time>2023-04-25T15:08:36.5534377+05:30</time></heartbeat></mos>`
        console.log(xml2js(dd))// word
        console.log(xml2js(_message)) // error <ref *1> Error: Text data outside of root node.

    }

    const axios = require('axios');

    const data = {
        foo: 'bar',
        baz: 123
    };


    // const aa = [{ key: "f0", value: `https://picsum.photos/id/${bb}/300/200`, type: "text" }, { key: "img1", value: `https://picsum.photos/id/${bb}/300/200`, type: "image" }, { key: "f0", value: 'blue', type: "fill" }, { key: "f0", value: 'white', type: "backgroundColor" }, { key: "f0", value: { color: 'black' }, type: "shadow" }]
    const aa = []
    var params = `layerNumber=96&pageName=LBand&data=${JSON.stringify(aa)}`

    // axios.post('http://localhost:9000/recallPage', params)
    //     .then(response => {
    //         // console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });

})

mos.on('connection', (stream) => {
    console.log('someone connected!', stream);
});
mos.on('error', (err) => {
    console.log('MosConnection emitted error', err)
})
mos.onConnection((mosDevice) => {
    console.log('A new Mosdevice connected')

    const mosTypes = mosDevice.mosTypes // Could also be retrieved with getMosTypes(strict)

    mosDevice.onRequestMachineInfo(async () => {
        return {
            manufacturer: mosTypes.mosString128.create('manufacturer RCC'),
            model: mosTypes.mosString128.create('model  RCC'),
            hwRev: mosTypes.mosString128.create('hwrev  RCC'),
            swRev: mosTypes.mosString128.create('1.0  RCC'),
            DOM: mosTypes.mosString128.create('2021-08-01'),
            SN: mosTypes.mosString128.create('1234  RCC'),
            ID: mosTypes.mosString128.create('MY ID  RCC'),
            time: mosTypes.mosTime.create(Date.now()),
            // opTime?: mosTypes.mosTime.create(),
            mosRev: mosTypes.mosString128.create('mosRev RCC'),

            supportedProfiles: {
                deviceType: 'MOS',
                profile0: true,
                profile1: true,
                profile2: true,
                profile4: true,
            },
        }
    })
    mosDevice.onRequestAllRunningOrders(async () => {
        return []
    })

})
mos.init()
    .then(() => console.log('Mos server initialized'))
    .catch(console.log)