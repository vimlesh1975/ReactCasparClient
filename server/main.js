const express = require('express');
const app = express();
const fs = require('fs');
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
        // console.log(err)
    })



// const bodyParser = require('body-parser');
// app.use(bodyParser({limit: '50mb'}));
// const jsonParser = bodyParser.json();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));



//open Ai Starts --------------------------------------------------------------------------
const dotenv = require('dotenv')
dotenv.config();
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get('/openai', async (req, res) => {
    res.status(200).send({
        message: 'Hello from vimlesh1975!'
    })
})

var previous_state='None';
app.post('/openai', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const model = req.body.model;

        // const response = await openai.createCompletion({
        const response = await openai.createCompletion({
            model: model,
            prompt: `${prompt}`,
            temperature: 0, // Higher values means the model will take more risks.
            max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
            top_p: 1, // alternative to sampling with temperature, called nucleus sampling
            frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
            // return_state:true
        });
        // console.log(JSON.stringify(response.data.choices))

        res.status(200).send({
            bot: response.data.choices[0].text
        });

    } catch (error) {
        // console.log(JSON.stringify(error.message))
        res.status(500).send(error.message || 'Something went wrong');

    }
})
app.post('/openai/models', async (req, res) => {
    try {
        const response = await openai.listEngines();
        res.status(200).send({
            bot: response.data
        });

    } catch (error) {
        // console.error(error)
        res.status(500).send(error || 'Something went wrong');
    }
})
//open ai end ------------------------------------------------------------------------------------------


// app.use(jsonParser);

const port = process.env.PORT || 9000;
const options = { cors: true };
const http = require("http").Server(app);

http.listen(port, () => {
    console.log(`Server is liestemnig on ${port}`);
})
var aa = new CasparCG("127.0.0.1", 5250)
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
    // console.log(req.headers.referer);
    aa.do(new AMCP.CustomCommand(req.body.string)).then((aa1) => {
        // console.log(aa1.response.raw);
    }).catch((aa2) => {
        // console.log(aa2.response.raw)
    });
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
app.use(express.static(path.join(__dirname, '..', 'client/public'))); //client folder build
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client/public', 'index.html'));
});

app.post('/startGameTimer', (req, res) => {
    const data = req.body;
    console.log(data)
    io.emit('startGameTimer', req.body)
    res.end('Sent The Commands:' + JSON.stringify(req.body))
})

app.post('/pauseGameTimer', (req, res) => {
    const data = req.body;
    console.log(data)
    io.emit('pauseGameTimer', req.body)
    res.end('Sent The Commands:' + JSON.stringify(req.body))
})
app.post('/resumeGameTimer', (req, res) => {
    const data = req.body;
    console.log(data)
    io.emit('resumeGameTimer', req.body)
    res.end('Sent The Commands:' + JSON.stringify(req.body))
})

app.post('/recallPage', (req, res) => {
    const data = req.body;
    // console.log(data)
    io.emit('recallPage', req.body)
    res.end('Sent The Commands:' + JSON.stringify(req.body))
})

app.post('/updateData', (req, res) => {
    const data = req.body;
    // console.log(data)
    io.emit('updateData', req.body)
    res.end('Sent The Commands:' + JSON.stringify(req.body))
})
app.post('/stopGraphics', (req, res) => {
    const data = req.body;
    // console.log(data)
    io.emit('stopGraphics', req.body)
    res.end('Sent The Commands' + JSON.stringify(req.body))
})
app.post('/getCurrentCanvas', (req, res) => {
    const data = req.body;
    io.emit('getCurrentCanvas', data)
    res.end(JSON.stringify(data))
})
app.post('/setCurrentCanvas', (req, res) => {
    const data = req.body;
    io.emit('setCurrentCanvas', req.body)
    res.end(JSON.stringify(req.body))
})



var server;
function startUdp() {
    var udp = require("dgram");
    server = udp.createSocket("udp4");
    server.on("error", function (error) {
        console.log("Error: " + error);
        server.close();
    });
    server.on("message", function (msg, info) {
        aa.do(new AMCP.CustomCommand(`call 1-96 "document.getElementById('clock').getElementsByTagName('text')[0].getElementsByTagName('tspan')[0].innerHTML='${msg.toString().substring(8)}'"`)).then((aa1) => {
        }).catch((aa2) => console.log(aa2));
        // console.log(msg);
    })
    server.on("listening", function () {
        var address = server.address();
        var port = address.port;
        var family = address.family;
        var ipaddr = address.address;
        console.log("Server is listening at port" + port);
        console.log("Server ip :" + ipaddr);
        console.log("Server is IP4/IP6 : " + family);
    });

    //emits after the socket is closed using socket.close();
    server.on("close", function () {
        console.log("Socket is closed !");
    });

    server.bind(2222);
}
app.post('/stopUdpClock', (req, res) => {
    server.close();
})
app.post('/showUdpClock', (req, res) => {
    startUdp();
    aa.do(new AMCP.CustomCommand(`play 1-96 [html] "${'file:///' + path.join(__dirname, '.', 'clock.html').replaceAll('\\', '/')}"`)).then((aa1) => {
    }).catch((aa2) => console.log(aa2));
})



app.post('/html', (req, res) => {
    io.emit('html', req.body)
    res.end(JSON.stringify(req.body))
})

app.post('/updateHtml', (req, res) => {
    io.emit('updateHtml', { data: req.body.data })
    res.end('')
})

app.post('/loadHtml', (req, res) => {
    fs.readFile(req.body.pageName, 'utf8', function (error, html) {
        if (error) {
            console.log(error);
        }
        io.emit('loadHtml', { html: html, data: req.body.data, clientId: req.body.clientId })
        res.end('');
    });
})

app.post('/callScript', (req, res) => {
    io.emit('callScript', req.body)
    res.end('')
})

app.post('/executeScript', (req, res) => {
    io.emit('executeScript', req.body)
    res.end('')
})

