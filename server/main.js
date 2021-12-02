const express = require('express');
const app = express();

const cors = require("cors");
const corsOptions = {
    // "Access-Control-Allow-Origin": "*",
}
app.use(cors(corsOptions))
var serveStatic = require("serve-static");
app.use('/media', serveStatic('c:\\casparcg\\_media'));



const { CasparCG, Priority, ConnectionOptions, CasparCGSocket, Options, AMCP } = require('casparcg-connection');

const fontList = require('font-list')
var myFontList

fontList.getFonts({ disableQuoting: true })
    .then(fonts => {
        myFontList = fonts;
    })
    .catch(err => {
        console.log(err)
    })

// const cors = require('cors')
// app.use(cors())


// const bodyParser = require('body-parser');
// app.use(bodyParser({limit: '50mb'}));
// const jsonParser = bodyParser.json();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

// app.use(jsonParser);

const port = process.env.PORT || 8080;
const options = { cors: true };
const http = require("http").Server(app);

http.listen(port, () => {
    console.log(`Server is liestemnig on ${port}`);
})
var aa = new CasparCG
aa.queueMode = Options.QueueMode.SEQUENTIAL;
aa.onConnectionChanged = () => {
    console.log(aa.connected)
    io.emit('connectionStatus', (aa.connected).toString())
}

var mediaPath = 'c:/casparcg/_media';
var templatePath;
var logPath;

// const PATH = require('path');


const dirTree = require("directory-tree");
var media = [];

const refreshMedia = () => {
    aa.getCasparCGPaths().then((aa1) => {
        mediaPath = aa1.absoluteMedia;
        templatePath = aa1.absoluteTemplate;
        logPath = aa1.absoluteLog;
        media = []
        var tree = dirTree(mediaPath, {}, (item, PATH, stats) => {
            // console.log(item.path, item.name)
            // console.log(item)
            var aa = (item.path).substring(mediaPath.length)
            media.push(aa)
        });
        console.log(media.length)

    }).catch((aa2) => console.log(aa2));
}
aa.onConnected = () => {
    refreshMedia()
    aa.getCasparCGVersion().then((aa1) => {
        console.log('version', aa1)

    }).catch((aa2) => console.log(aa2));

    io.emit('connectionStatus', (aa.connected).toString())
}

app.post('/connect', (req, res) => {
    aa.connect()
    res.end()
})
app.post('/disconnect', (req, res) => {
    aa.disconnect()
    res.end()
})

app.post('/getfonts', (req, res) => {
    res.send(myFontList)
    res.end()
})


app.post('/getmedia', (req, res) => {
    refreshMedia()
    setTimeout(() => {
        res.send(media)
        res.end()
    }, 2000);

})


app.post('/endpoint', (req, res) => {
    aa.do(new AMCP.CustomCommand(req.body.string)).then((aa1) => {
        // console.log(req.body.string)
        // console.log(aa1.response.raw)
    }).catch((aa2) => console.log(aa2));
    res.end()
})

app.get('/cgupdate', (req, res) => {
    const aa1 = { oneliner: 'vimlesh' };
    aa.cgUpdate(1, 101, 0, aa1)
    res.end()
})

app.post('/getPaths', (req, res) => {
    res.send(mediaPath);
})

app.post('/recallPage', (req, res) => {
   const data=req.body;
    console.log(data)
    io.emit('recallPage', req.body)
    res.end('Sent The Commands')
})



const io = require("socket.io")(http, options);
const ccgsocket = new CasparCGSocket('localhost', 5250)

// udpPort.on("message", function (oscMessage, info) {

//     if (oscMessage.address === '/channel/1/stage/layer/1/file/time') {
//         ccgsocket.emit('Fromccgsocket', oscMessage.args[0].value);
//         io.emit("FromAPI", oscMessage.args[0].value);
//     }
//     else if (oscMessage.address === '/channel/1/stage/layer/1/foreground/file/time') {
//         ccgsocket.emit('Fromccgsocket', oscMessage.args[0].value);
//         io.emit("FromAPI", oscMessage.args[0].value);
//     }
// });
// var osc = require('osc')
// var udpPort = new osc.UDPPort({
//     localAddress: "127.0.0.1",
//     localPort: 6250,
//     metadata: true
// });
// udpPort.open();

global.app = app;

io.on('connection', (socket) => {
    console.log("New client connected");
    socket.emit('connectionStatus', (aa.connected).toString())
    socket.on("disconnect", () => {
        console.log("client disconnected")
    })
})

const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'client/build'))); //client folder build
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
});