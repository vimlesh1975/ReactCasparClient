const { MosConnection, ConnectionConfig, xml2js, MosModel, MosDevice, getMosTypes } = require('@mos-connection/connector')
const axios = require('axios');

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
    console.log(_source, _type, _message)

    if (_message.includes('<?xml')) {
        const data = xml2js(_message)
        console.log(data?.mos?.dataList?.cData)
        // const aa = [{ key: "f0", value: `https://picsum.photos/id/${bb}/300/200`, type: "text" }, { key: "img1", value: `https://picsum.photos/id/${bb}/300/200`, type: "image" }, { key: "f0", value: 'blue', type: "fill" }, { key: "f0", value: 'white', type: "backgroundColor" }, { key: "f0", value: { color: 'black' }, type: "shadow" }]
        if (data?.mos?.pageName) {
            const aa = data.mos?.dataList.cData
            var params = `layerNumber=${data.mos?.layerNumber}&pageName=${data?.mos?.pageName}&data=${JSON.stringify(aa)}`
            const type = data?.mos?.type
            console.log(type)
            axios.post('http://localhost:9000/recallPage', params)
                .then(response => {
                    // console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }

    }
    const reply = {
        ID: 'mosID_RCC',
        Status: getMosTypes(true).mosString128.create('OK'),
        Stories: [],
    }
    return reply

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
    mosDevice.onRequestMOSObject(async () => {
        const reply = {
            ID: 'mosID_RCC',
            Status: mosTypes.mosString128.create('OK'),
            Stories: [],
        }
        return reply
    })
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