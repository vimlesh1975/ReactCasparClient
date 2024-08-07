const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const https = require('https');
const axios = require('axios');
const corsOptions = {
  // "Access-Control-Allow-Origin": "*",
};

app.use(cors());
var serveStatic = require('serve-static');
app.use('/media', serveStatic('c:\\casparcg\\_media'));

const {
  CasparCG,
  CasparCGSocket,
  Options,
  AMCP,
} = require('casparcg-connection');

const fontList = require('font-list');
var myFontList;

fontList
  .getFonts({ disableQuoting: true })
  .then((fonts) => {
    myFontList = fonts;
  })
  .catch((err) => {
    // console.log(err)
  });

// const bodyParser = require('body-parser');
// app.use(bodyParser({limit: '50mb'}));
// const jsonParser = bodyParser.json();

app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
);

const dotenv = require('dotenv');
dotenv.config();

//iconfinderApiKey Starts ----


const iconfinderApiKey = process.env.REACT_APP_ICONFINDER_API_KEY;
const unsplashAccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;


app.get('/api/iconfinder', async (req, res) => {
  try {
    const response = await axios.get('https://api.iconfinder.com/v4/icons/search', {
      headers: {
        Authorization: `Bearer ${iconfinderApiKey}`,
      },
      params: req.query,
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Iconfinder API:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/iconfinder/getSvg', async (req, res) => {
  try {
    const response = await axios.get(req.body.svgUrl, {
      headers: {
        Authorization: `Bearer ${iconfinderApiKey}`,
      },
    });
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching data from Iconfinder API:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
//iconfinderApiKey ends ----

//unsplash starts ----

app.get('/api/unsplash/search/photos', async (req, res) => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: req.query.query,
        client_id: unsplashAccessKey,
        page: req.query.page || 1,
        per_page: req.query.per_page || 30,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching photos from Unsplash API:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
//unsplash ends ----

//open Ai Starts --------------------------------------------------------------------------

const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get('/openai', async (req, res) => {
  res.status(200).send({
    message: 'Hello from vimlesh1975!',
  });
});

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
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    // console.log(JSON.stringify(error.message))
    res.status(500).send(error.message || 'Something went wrong');
  }
});

app.post('/openaiimage', async (req, res) => {
  // console.log(req)
  try {
    const prompt = req.body.prompt;
    const response = await openai.createImage({
      prompt: `${prompt}`,
      n: 1,
      size: '256x256',
    });
    // console.log(response['data'].data[0].url)

    res.status(200).send({
      bot: response['data'].data[0].url,
    });
  } catch (error) {
    // console.log(JSON.stringify(error.message))
    res.status(500).send(error.message || 'Something went wrong');
  }
});

app.post('/openaiimagebase64', async (req, res) => {
  // console.log(req)
  try {
    const prompt = req.body.prompt;
    const response = await openai.createImage({
      prompt: `${prompt}`,
      n: 1,
      size: '256x256',
    });
    // console.log(response['data'].data[0].url)

    https
      .get(response['data'].data[0].url, (resnode) => {
        let data = '';

        resnode.on('data', (chunk) => {
          data += chunk;
        });

        resnode.on('end', () => {
          const base64 = Buffer.from(data).toString('base64');
          // console.log(base64);
          res.status(200).send({
            bot: base64,
          });
        });
      })
      .on('error', (err) => {
        console.error(err);
      });


  } catch (error) {
    // console.log(JSON.stringify(error.message))
    res.status(500).send(error.message || 'Something went wrong');
  }
});

app.post('/openai/models', async (req, res) => {
  try {
    const response = await openai.listEngines();
    res.status(200).send({
      bot: response.data,
    });
  } catch (error) {
    // console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
});
//open ai end ------------------------------------------------------------------------------------------

// app.use(jsonParser);

const port = process.env.PORT || 9000;
const options = { cors: true };

const options2 = {
  key: fs.readFileSync('cert.key'),
  cert: fs.readFileSync('cert.crt'),
};

const server2 = https.createServer(options2, app);

server2.listen(port, () => {
  console.log(`Node server is listening on port ${port} with HTTPS`);
});

var aa = new CasparCG('127.0.0.1', 5250);
aa.queueMode = Options.QueueMode.SEQUENTIAL;
aa.onConnectionChanged = () => {
  console.log(aa.connected);
  io.emit('connectionStatus', aa.connected.toString());
};

var mediaPath = 'c:/casparcg/_media';
var templatePath = 'c:/casparcg';
// var templatePath;
var logPath;

const dirTree = require('directory-tree');
var media = [];
var template = [];

const refreshMedia = () => {
  aa.getCasparCGPaths()
    .then((aa1) => {
      mediaPath = aa1.absoluteMedia;
      templatePath = aa1.absoluteTemplate;
      logPath = aa1.absoluteLog;
      media = [];
      var tree = dirTree(mediaPath, {}, (item, PATH, stats) => {

        var aa = item.path.substring(mediaPath.length);
        media.push(aa);
      });
      console.log(media.length);
    })
    .catch((aa2) => console.log(aa2));
};

const refreshTemplate = () => {
  aa.getCasparCGPaths()
    .then((aa1) => {
      templatePath = aa1.absoluteTemplate;
      template = [];
      var tree = dirTree(templatePath, {}, (item, PATH, stats) => {

        var aa = item.path.substring(templatePath.length);
        if (aa.endsWith(".html")) {
          template.push(aa);
        }
        // template.push(aa);
      });
      console.log(template.length);
    })
    .catch((aa2) => console.log(aa2));
};

aa.onConnected = () => {
  refreshMedia();
  refreshTemplate();
  aa.getCasparCGVersion()
    .then((aa1) => {
      console.log('version', aa1);
    })
    .catch((aa2) => console.log(aa2));

  io.emit('connectionStatus', aa.connected.toString());
};

app.post('/connect', (req, res) => {
  aa.connect();
  res.end();
});
app.post('/disconnect', (req, res) => {
  aa.disconnect();
  res.end();
});

app.post('/getfonts', (req, res) => {
  res.send(myFontList);
  res.end();
});

app.post('/getmedia', (req, res) => {
  refreshMedia();
  setTimeout(() => {
    res.send(media);
    res.end();
  }, 2000);
});

app.post('/gettemplate', (req, res) => {
  refreshTemplate();
  setTimeout(() => {
    res.send(template);
    res.end();
  }, 2000);
});



app.post('/endpoint', (req, res) => {
  // console.log(req.headers.referer);
  aa.do(new AMCP.CustomCommand(req.body.string))
    .then((aa1) => {
      // console.log(aa1.response.raw);
    })
    .catch((aa2) => {
      // console.log(aa2.response.raw)
    });
  res.end();
});

app.get('/cgupdate', (req, res) => {
  const aa1 = { oneliner: 'vimlesh' };
  aa.cgUpdate(1, 101, 0, aa1);
  res.end();
});

app.post('/getPaths', (req, res) => {
  res.send(mediaPath);
});

const io = require('socket.io')(server2, options);
const ccgsocket = new CasparCGSocket('localhost', 5250);

global.app = app;

io.on('connection', (socket) => {
  console.log('New Web Socket client connected');
  socket.emit('connectionStatus', aa.connected.toString());
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'client/public'))); //client folder build
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'client/public', 'index.html'));
});

// app.post('/startGameTimer', (req, res) => {
//   const data = req.body;
//   console.log(data);
//   io.emit('startGameTimer', req.body);
//   res.end('Sent The Commands:' + JSON.stringify(req.body));
// });

// app.post('/pauseGameTimer', (req, res) => {
//   const data = req.body;
//   console.log(data);
//   io.emit('pauseGameTimer', req.body);
//   res.end('Sent The Commands:' + JSON.stringify(req.body));
// });
// app.post('/resumeGameTimer', (req, res) => {
//   const data = req.body;
//   console.log(data);
//   io.emit('resumeGameTimer', req.body);
//   res.end('Sent The Commands:' + JSON.stringify(req.body));
// });

app.post('/recallPage', (req, res) => {
  const data = req.body;
  // console.log(data)
  io.emit('recallPage', req.body);
  res.end('Sent The Commands:' + JSON.stringify(req.body));
});

app.post('/updateData', (req, res) => {
  const data = req.body;
  // console.log(data)
  io.emit('updateData', req.body);
  res.end('Sent The Commands:' + JSON.stringify(req.body));
});
app.post('/stopGraphics', (req, res) => {
  const data = req.body;
  // console.log(data)
  io.emit('stopGraphics', req.body);
  res.end('Sent The Commands' + JSON.stringify(req.body));
});
app.post('/getCurrentCanvas', (req, res) => {
  const data = req.body;
  io.emit('getCurrentCanvas', data);
  res.end(JSON.stringify(data));
});
app.post('/setCurrentCanvas', (req, res) => {
  const data = req.body;
  io.emit('setCurrentCanvas', req.body);
  res.end(JSON.stringify(req.body));
});


app.post('/html', (req, res) => {
  io.emit('html', req.body);
  res.end(JSON.stringify(req.body));
});

app.post('/chat', (req, res) => {
  io.emit('chat', req.body);
  res.end(JSON.stringify(req.body));
});

app.post('/updateHtml', (req, res) => {
  io.emit('updateHtml', { data: req.body.data });
  res.end('');
});

app.post('/loadHtml', (req, res) => {
  fs.readFile(req.body.pageName, 'utf8', function (error, html) {
    if (error) {
      console.log(error);
    }
    io.emit('loadHtml', {
      html: html,
      data: req.body.data,
      clientId: req.body.clientId,
    });
    res.end('');
  });
});

app.post('/callScript', (req, res) => {
  io.emit('callScript', req.body);
  res.end('');
});

app.post('/executeScript', (req, res) => {
  io.emit('executeScript', req.body);
  res.end('');
});

app.post('/readfile', (req, res) => {
  fs.readFile(templatePath + req.body.filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }
    res.send(data);
    res.end();
  });
});


// rss feed code  starts
app.post('/fetch-proxy', async (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is missing' });
  }

  try {
    const response = await fetch(url);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error('Error fetching URL:', error);
    res.status(500).send('Error fetching URL');
  }
});


// rss feed code  ends

//NRCS code starts-----------

const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'itmaint',
  password: 'itddkchn',
  database: 'c1news',
});

app.get('/getNewsID', async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT distinct title FROM newsid where title != '' order by title asc`);
    res.send(rows);
  } catch (error) {
    console.log(error);

  }

});

app.get('/show_runorder', async (req, res) => {
  const param1 = req.query.param1;
  try {
    const [rows] = await pool.query(`CALL show_runorder('${param1}')`);
    res.send(rows[0]);
  } catch (error) {
    console.log(error);
  }

});

app.get('/getGraphics', async (req, res) => {
  const ScriptID = req.query.ScriptID;
  try {
    const [rows] = await pool.query(`SELECT * FROM graphics where ScriptID='${ScriptID}' order by GraphicsOrder`);
    res.send(rows);
  } catch (error) {
    console.log(error);

  }

});

app.post('/setGraphics', async (req, res) => {
  const { content, graphicsID } = req.body;
  try {
    await pool.query(`UPDATE graphics SET GraphicsText1 = ?  where GraphicsID='${graphicsID}'`, [content]);
    res.send('');
  } catch (error) {
    console.log(error);

  }

});

app.post('/insertGraphics', async (req, res) => {
  const { GraphicsID, Graphicstext1, GraphicsOrder, ScriptID, GraphicsTemplate } = req.body;
  const values = [GraphicsID, Graphicstext1, GraphicsOrder, ScriptID, GraphicsTemplate];
  try {
    await pool.query(`INSERT INTO graphics (GraphicsID, Graphicstext1, GraphicsOrder, ScriptID, GraphicsTemplate) VALUES (?, ?, ?, ?, ?)`, values);
    res.send('');
  } catch (error) {
    console.log(error);

  }

});

app.post('/updateGraphicsOrder', async (req, res) => {
  const { GraphicsID, GraphicsOrder } = req.body;
  try {
    await pool.query(`update  graphics  SET GraphicsOrder = ?  where GraphicsID='${GraphicsID}'`, [GraphicsOrder]);
    res.send('');
  } catch (error) {
    console.log(error);

  }

});

app.post('/updateGraphicTemplate', async (req, res) => {
  const { GraphicsID, GraphicsTemplate } = req.body;
  if (!GraphicsID) {
    return res.status(400).send('GraphicsID is required');
  }
  try {
    await pool.query(`update  graphics  SET GraphicsTemplate = ?  where GraphicsID='${GraphicsID}'`, [GraphicsTemplate]);
    res.send('Graphic updated successfully');
  } catch (error) {
    console.error('Error deleting graphic:', error);
    res.status(500).send('An error occurred while deleting the graphic');
  }
});

app.post('/deleteGraphics', async (req, res) => {
  const { GraphicsID } = req.body;
  if (!GraphicsID) {
    return res.status(400).send('GraphicsID is required');
  }
  try {
    await pool.query(`delete from  graphics where GraphicsID='${GraphicsID}'`);
    res.send('Graphic deleted successfully');
  } catch (error) {
    console.error('Error deleting graphic:', error);
    res.status(500).send('An error occurred while deleting the graphic');
  }
});


app.get('/getContent', async (req, res) => {
  const ScriptID = req.query.ScriptID;
  try {
    const [rows] = await pool.query(`SELECT Script FROM script where ScriptID='${ScriptID}' LIMIT 1`);
    res.send(rows[0]);
  } catch (error) {
  }
})

app.post('/updateContent', async (req, res) => {
  const { content, ScriptID } = req.body;
  try {
    await pool.query(`UPDATE script SET Script = ?  where ScriptID='${ScriptID}' LIMIT 1`, [content]);
    res.send('');
  } catch (error) {
    console.log(error);
  }
});


// NRCS code ends