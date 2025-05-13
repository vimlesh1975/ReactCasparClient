// mos-server.js
const { MosConnection, MosModel } = require('@mos-connection/connector');
console.log('from mos server' + io);
const mosID = 'WTVISION.STUDIO.MOS';
const mosDeviceID = 'NEWSROOM_ID';
const mosPort = 10540;

async function startMosServer() {
    const mosConnection = new MosConnection({
        mosID,
        heartbeatInterval: 50000,
        id: 'MOS_SERVER_ID',
        acceptsConnections: true,
        deviceID: mosDeviceID,
        mosHost: 'localhost',
        openMosPort: mosPort,
        profiles: { '0': true, '1': true, '2': true, '4': true },
        openRelay: true,
        debug: false,
        isNCS: true,
    });

    // mosConnection.on('rawMessage', (_source, _type, _message) => {
    //     console.log('rawMessag in server', _source, _type, _message)
    // })


    mosConnection.onConnection((mosDevice) => {
        console.log('📡 Connected to NRCS:', mosDevice.idPrimary);
        const mosTypes = mosDevice.mosTypes // Could also be retrieved with getMosTypes(strict)

        mosDevice.onRequestMachineInfo(async () => {
            return {
                manufacturer: mosTypes.mosString128.create('mommy'),
                model: mosTypes.mosString128.create('model!'),
                hwRev: mosTypes.mosString128.create('0.1'),
                swRev: mosTypes.mosString128.create('1.0'),
                DOM: mosTypes.mosString128.create('1989-07-01'),
                SN: mosTypes.mosString128.create('1234'),
                ID: mosTypes.mosString128.create('MY ID'),
                time: mosTypes.mosTime.create(Date.now()),
                // opTime?: mosTypes.mosTime.create(),
                mosRev: mosTypes.mosString128.create('A'),

                supportedProfiles: {
                    deviceType: 'MOS',
                    profiles: { '0': true, '1': true, '2': true, '4': true },
                },
            }
        })
        mosDevice.onMOSObjects(async (objs) => {
            io.emit("onMOSObjects", objs);
            console.log(objs);
            return {
                ID: objs[0]?.ID,      // Use object ID from first object
                Rev: 0,               // Revision number (you can adjust if needed)
                Status: 'OK'          // or 'NACK' for negative acknowledgment
            };
        });
        mosDevice.onDeleteRunningOrder(async (RunningOrderID) => {
            console.log('delete running order', RunningOrderID)
            return {
                ID: RunningOrderID,
                Status: mosTypes.mosString128.create('OK'),
                Stories: [],
            }
        })

        mosDevice.onCreateRunningOrder(async (ro) => {
            console.log('create running order', ro)
            return {
                ID: ro.ID,
                Status: mosTypes.mosString128.create('OK'),
                Stories: [],
            }
        })


        mosDevice.onRequestMOSList((cb) => {
            console.log('🗂️ MOS List requested');
            const mosList = new MosModel.mosList();
            cb(mosList);
        });

        mosDevice.onStoryInsert((roID, storyID, story, cb) => {
            console.log(`➕ Insert Story in rundown ${roID}`, story);
            cb();
        });

        mosDevice.onStoryReplace((roID, storyID, story, cb) => {
            console.log(`♻️ Replace Story in rundown ${roID}`, story);
            cb();
        });

        mosDevice.onStoryDelete((roID, storyID, cb) => {
            console.log(`🗑️ Delete Story from rundown ${roID}`, storyID);
            cb();
        });


        mosDevice.onDeleteRunningOrder((roID, cb) => {
            console.log(`❌ Delete Running Order: ${roID}`);
            cb();
        });
    });



    return mosConnection.init().then(() => {
        console.log(`🚀 MOS Server is running on port ${mosPort}`);
        return mosConnection;
    });
}
module.exports = { startMosServer };
