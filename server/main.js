require("dotenv").config(); // Load environment variables from .env file
// console.log(process.env.DB_HOST);

//end code for google translation
const { exec } = require('child_process');

function killPort(port) {
  return new Promise((resolve) => {
    exec(`netstat -aon | findstr LISTENING | findstr :${port}`, (err, stdout) => {
      if (err || !stdout) return resolve();

      const lines = stdout.trim().split('\n');
      const pids = new Set();

      lines.forEach(line => {
        const match = line.match(/\s+(\d+)$/); // PID is last column
        if (match) {
          const pid = match[1];
          pids.add(pid);
        }
      });

      if (pids.size === 0) return resolve();

      let killed = 0;
      pids.forEach(pid => {
        exec(`taskkill /PID ${pid} /F`, (killErr, killStdout, killStderr) => {
          if (!killErr) {
            console.log(`✅ Killed process on port ${port} (PID ${pid})`);
          } else {
            console.warn(`⚠️ Failed to kill PID ${pid}:`, killStderr || killErr.message);
          }

          killed++;
          if (killed === pids.size) resolve();
        });
      });
    });
  });
}

const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const https = require("https");
const axios = require("axios");
const corsOptions = {
  // "Access-Control-Allow-Origin": "*",
};

app.use(cors());
var serveStatic = require("serve-static");
app.use("/media", serveStatic("c:\\casparcg\\_media"));

const {
  CasparCG,
  CasparCGSocket,
  Options,
  AMCP,
} = require("casparcg-connection");

const fontList = require("font-list");
var myFontList;

fontList
  .getFonts({ disableQuoting: true })
  .then((fonts) => {
    myFontList = fonts;
  })
  .catch((err) => {
    // console.log(err)
  });

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

const dotenv = require("dotenv");
dotenv.config();

//iconfinderApiKey Starts ----

const iconfinderApiKey = process.env.REACT_APP_ICONFINDER_API_KEY;
const unsplashAccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const removebgapikey = process.env.REACT_APP_REMOVEBG_API_KEY;

// Proxy route to interact with remove.bg API
app.post("/api/remove-bg", async (req, res) => {
  const { base64Image } = req.body;

  try {
    // Send request to remove.bg API with base64 image data
    const response = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      {
        image_file_b64: base64Image.replace(
          /^data:image\/(png|jpg|jpeg);base64,/,
          ""
        ),
        size: "auto",
      },
      {
        headers: {
          "X-Api-Key": removebgapikey,
        },
        responseType: "arraybuffer", // Ensure response is a buffer to handle binary data
      }
    );

    // Convert the buffer to base64 so that we can send it back to the frontend
    const base64Data = `data:image/png;base64,${Buffer.from(
      response.data,
      "binary"
    ).toString("base64")}`;

    // Send back the image data in base64 format
    res.status(200).json({ imageData: base64Data });
  } catch (error) {
    console.error(
      "Error in remove.bg API call:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "Failed to remove background." });
  }
});

app.get("/api/iconfinder", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.iconfinder.com/v4/icons/search",
      {
        headers: {
          Authorization: `Bearer ${iconfinderApiKey}`,
        },
        params: req.query,
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Iconfinder API:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/iconfinder/getSvg", async (req, res) => {
  try {
    const response = await axios.get(req.body.svgUrl, {
      headers: {
        Authorization: `Bearer ${iconfinderApiKey}`,
      },
    });
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching data from Iconfinder API:", error.message);
    res.status(500).send("Internal Server Error");
  }
});
//iconfinderApiKey ends ----

//unsplash starts ----

app.get("/api/unsplash/search/photos", async (req, res) => {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: req.query.query,
        client_id: unsplashAccessKey,
        page: req.query.page || 1,
        per_page: req.query.per_page || 30,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching photos from Unsplash API:", error.message);
    res.status(500).send("Internal Server Error");
  }
});
//unsplash ends ----

//open Ai Starts --------------------------------------------------------------------------

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/openai", async (req, res) => {
  res.status(200).send({
    message: "Hello from vimlesh1975!",
  });
});

app.post("/openai", async (req, res) => {
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
    res.status(500).send(error.message || "Something went wrong");
  }
});

app.post("/openaiimage", async (req, res) => {
  // console.log(req)
  try {
    const prompt = req.body.prompt;
    const response = await openai.createImage({
      prompt: `${prompt}`,
      n: 1,
      size: "256x256",
    });
    // console.log(response['data'].data[0].url)

    res.status(200).send({
      bot: response["data"].data[0].url,
    });
  } catch (error) {
    // console.log(JSON.stringify(error.message))
    res.status(500).send(error.message || "Something went wrong");
  }
});

app.post("/openaiimagebase64", async (req, res) => {
  // console.log(req)
  try {
    const prompt = req.body.prompt;
    const response = await openai.createImage({
      prompt: `${prompt}`,
      n: 1,
      size: "256x256",
    });
    // console.log(response['data'].data[0].url)

    https
      .get(response["data"].data[0].url, (resnode) => {
        let data = "";

        resnode.on("data", (chunk) => {
          data += chunk;
        });

        resnode.on("end", () => {
          const base64 = Buffer.from(data).toString("base64");
          // console.log(base64);
          res.status(200).send({
            bot: base64,
          });
        });
      })
      .on("error", (err) => {
        console.error(err);
      });
  } catch (error) {
    // console.log(JSON.stringify(error.message))
    res.status(500).send(error.message || "Something went wrong");
  }
});

app.post("/openai/models", async (req, res) => {
  try {
    const response = await openai.listEngines();
    res.status(200).send({
      bot: response.data,
    });
  } catch (error) {
    // console.error(error)
    res.status(500).send(error || "Something went wrong");
  }
});
//open ai end ------------------------------------------------------------------------------------------

// app.use(jsonParser);

const port = process.env.PORT || 9000;
const options = { cors: true };

const options2 = {
  key: fs.readFileSync("cert.key"),
  cert: fs.readFileSync("cert.crt"),
};

const server2 = https.createServer(options2, app);





var aa = new CasparCG("127.0.0.1", 5250);
aa.queueMode = Options.QueueMode.SEQUENTIAL;
aa.onConnectionChanged = () => {
  console.log(aa.connected);
  io.emit("connectionStatus", aa.connected.toString());
};

var mediaPath = "c:/casparcg/_media";
var templatePath = "c:/casparcg";
// var templatePath;
var logPath;

const dirTree = require("directory-tree");
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
      console.log("version", aa1);
    })
    .catch((aa2) => console.log(aa2));

  io.emit("connectionStatus", aa.connected.toString());
};

app.post("/connect", (req, res) => {
  aa.connect();
  res.end();
});
app.post("/disconnect", (req, res) => {
  aa.disconnect();
  res.end();
});

app.post("/getfonts", (req, res) => {
  res.send(myFontList);
  res.end();
});

app.post("/getmedia", (req, res) => {
  refreshMedia();
  setTimeout(() => {
    res.send(media);
    res.end();
  }, 2000);
});

app.post("/gettemplate", (req, res) => {
  refreshTemplate();
  setTimeout(() => {
    res.send(template);
    res.end();
  }, 2000);
});

app.post("/endpoint", (req, res) => {
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

app.get("/cgupdate", (req, res) => {
  const aa1 = { oneliner: "vimlesh" };
  aa.cgUpdate(1, 101, 0, aa1);
  res.end();
});

app.post("/getPaths", (req, res) => {
  res.send(mediaPath);
});

const io = require("socket.io")(server2, options);
const ccgsocket = new CasparCGSocket("localhost", 5250);

global.app = app;
global.io = io;
// console.log(app)


var newdatabase = true;
//  newdatabase = false;

const oldDatabaseName = 'c1news';
const newDatabasename = 'nrcsnew';
const dbname = newdatabase ? newDatabasename : oldDatabaseName;

const mysql = require("mysql2/promise");
let pool;
let databaseConnection = 'false';

async function initDB() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "itmaint",
      password: process.env.DB_PASSWORD || "itddkchn",
      database: process.env.DB_DATABASE || dbname,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Try to get a connection to verify
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database");
    databaseConnection = 'true';
    io.emit('databaseConnection', 'true');
    connection.release(); // Release back to pool
  } catch (error) {
    console.error("MySQL connection error:", error.message);
    databaseConnection = 'false';
    io.emit('databaseConnection', 'false');
  }
}

initDB();

io.on("connection", (socket) => {
  console.log("New Web Socket client connected");
  socket.emit("connectionStatus", aa.connected.toString());
  socket.emit("newdatabase", newdatabase);
  socket.emit("databaseConnection", databaseConnection);

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
  socket.on("DataFromCanvas", (data) => {
    io.emit("DataFromCanvas2", data);
  });
  socket.on("Iamready", (data) => {
    io.emit("Iamready2", data);
  });

  socket.on("templateList", data => {
    console.log(data)
  })

});

const path = require("path");
app.use(express.static(path.join(__dirname, "..", "client/public"))); //client folder build
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "client/public", "index.html"));
});


app.post("/recallPage", (req, res) => {
  io.emit("recallPage", req.body);
  res.end("Sent The Commands:" + JSON.stringify(req.body));
});

app.post("/getTemplateList", (req, res) => {
  console.log('getTemplateList')
  io.emit("getTemplateList", req.body);
  res.end("Sent The Commands:" + JSON.stringify(req.body));
});



app.post("/updateData", (req, res) => {
  const data = req.body;
  // console.log(data)
  io.emit("updateData", req.body);
  res.end("Sent The Commands:" + JSON.stringify(req.body));
});
app.post("/stopGraphics", (req, res) => {
  const data = req.body;
  // console.log(data)
  io.emit("stopGraphics", req.body);
  res.end("Sent The Commands" + JSON.stringify(req.body));
});
app.post("/getCurrentCanvas", (req, res) => {
  const data = req.body;
  io.emit("getCurrentCanvas", data);
  res.end(JSON.stringify(data));
});
app.post("/setCurrentCanvas", (req, res) => {
  const data = req.body;
  io.emit("setCurrentCanvas", req.body);
  res.end(JSON.stringify(req.body));
});

app.post("/html", (req, res) => {
  io.emit("html", req.body);
  res.end(JSON.stringify(req.body));
});

app.post("/chat", (req, res) => {
  io.emit("chat", req.body);
  res.end(JSON.stringify(req.body));
});

app.post("/updateHtml", (req, res) => {
  io.emit("updateHtml", { data: req.body.data });
  res.end("");
});

app.post("/loadHtml", (req, res) => {
  fs.readFile(req.body.pageName, "utf8", function (error, html) {
    if (error) {
      console.log(error);
    }
    io.emit("loadHtml", {
      html: html,
      data: req.body.data,
      clientId: req.body.clientId,
    });
    res.end("");
  });
});

app.post("/callScript", (req, res) => {
  io.emit("callScript", req.body);
  res.end("");
});

app.post("/executeScript", (req, res) => {
  io.emit("executeScript", req.body);
  res.end("");
});

app.post("/readfile", (req, res) => {
  fs.readFile(templatePath + req.body.filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }
    res.send(data);
    res.end();
  });
});

// rss feed code  starts
app.post("/fetch-proxy", async (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is missing" });
  }

  try {
    const response = await fetch(url);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error("Error fetching URL:", error);
    res.status(500).send("Error fetching URL");
  }
});

// rss feed code  ends

//NRCS code starts-----------



// Helper function to handle database queries
async function safeQuery(query, params = []) {
  if (!pool) {
    throw new Error("MySQL pool is not initialized");
  }
  return await pool.query(query, params);
}

app.get("/getNewsID", async (req, res) => {
  const query = newdatabase ? `SELECT distinct bulletinname as title FROM bulletin where bulletinname != '' and bulletintype !='Pool' order by bulletinname asc` : `SELECT distinct title FROM newsid where title != '' order by title asc`
  try {
    const [rows] = await safeQuery(
      query
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching news IDs");
  }
});

app.get("/show_runorder", async (req, res) => {
  const param1 = req.query.param1;
  const param2 = req.query.param2;
  if (param1 === "") {
    res.status(500).send("Error fetching run order");
    return;
  }
  const query = newdatabase ? `SELECT *, 
  slno AS RunOrder, 
  createdtime AS CreatedTime, 
  approved AS Approval, 
  graphicsid as MediaInsert,
  dropstory AS DropStory
  FROM script 
  WHERE deleted = 0 AND bulletinname = ? AND bulletindate = ? 
  ORDER BY RunOrder;`: `CALL show_runorder(?)`
  try {
    const [rows] = await safeQuery(query, [param1, param2]);
    res.send(newdatabase ? rows : rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching run order");
  }
});

app.get("/show_runorderSpecial", async (req, res) => {
  const param1 = req.query.param1;
  const param2 = req.query.param2;

  if (param1 === "") {
    res.status(500).send("Error fetching run order");
    return;
  }
  const query = `SELECT *, 
  slno AS RunOrder, 
  createdtime AS CreatedTime, 
  approved AS Approval, 
  graphicsid as MediaInsert,
  dropstory AS DropStory
  FROM ${newDatabasename}.script 
  WHERE deleted = 0 AND bulletinname = ? AND bulletindate = ? 
  ORDER BY RunOrder;`
  try {
    const [rows] = await safeQuery(query, [param1, param2]);
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching run order");
  }
});

app.get("/getContent", async (req, res) => {
  const ScriptID = req.query.ScriptID;
  const NewsId = req.query.NewsId;
  const query = newdatabase ? `SELECT Script FROM script WHERE ScriptID=?` : `SELECT Script FROM script WHERE ScriptID=? AND NewsId=?`;
  try {
    const [rows] = await safeQuery(
      query,
      [ScriptID, NewsId]
    );
    res.send(rows[0]);
  } catch (error) {
    res.status(500).send("Error fetching content");
  }
});


app.post("/updateContent", async (req, res) => {
  const { content, ScriptID, NewsId } = req.body;
  const query = newdatabase ? `UPDATE script SET Script = ? WHERE ScriptID=?` : `UPDATE script SET Script = ? WHERE ScriptID=? AND NewsId=?`;
  try {
    await safeQuery(
      query,
      [content, ScriptID, NewsId]
    );
    res.send("");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating content");
  }
});
app.get("/getGraphics", async (req, res) => {
  const ScriptID = req.query.ScriptID;
  const query = newdatabase ? `SELECT *, slno as GraphicsOrder, gfxtemplatetext as Graphicstext1, gfxtemplatename as GraphicsTemplate  FROM graphics where ScriptID=? AND gfxtemplatetext IS NOT NULL order by GraphicsOrder` : `SELECT * FROM graphics where ScriptID=? AND GraphicsText1 IS NOT NULL order by GraphicsOrder`;
  try {
    const [rows] = await safeQuery(
      query,
      [ScriptID]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching graphics");
  }
});

app.post("/setGraphics", async (req, res) => {
  const { content, graphicsID } = req.body;
  const query = newdatabase ? `UPDATE graphics SET gfxtemplatetext = ? where GraphicsID=?` : `UPDATE graphics SET GraphicsText1 = ? where GraphicsID=?`;
  try {
    await safeQuery(
      query,
      [content, graphicsID]
    );
    res.send("");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error setting graphics");
  }
});

app.post("/insertGraphics", async (req, res) => {
  const {
    GraphicsID,
    Graphicstext1,
    GraphicsOrder,
    ScriptID,
    GraphicsTemplate,
  } = req.body;
  const values = [
    GraphicsID,
    Graphicstext1,
    GraphicsOrder,
    ScriptID,
    GraphicsTemplate,
  ];
  const query = newdatabase ? `INSERT INTO graphics (GraphicsID, gfxtemplatetext, slno, ScriptID, gfxtemplatename) VALUES (?, ?, ?, ?, ?)` : `INSERT INTO graphics (GraphicsID, Graphicstext1, GraphicsOrder, ScriptID, GraphicsTemplate) VALUES (?, ?, ?, ?, ?)`;
  try {
    await safeQuery(
      query,
      values
    );
    res.send("");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error inserting graphics");
  }
});

app.post("/updateCGEntry", async (req, res) => {
  const { cgValue, ScriptID, NewsId, selectedDate } = req.body;
  const emitteddata = { cgValue, ScriptID, NewsId, selectedDate };
  io.emit("updateCGEntry", emitteddata);
  const values = [
    cgValue,
    ScriptID,
    NewsId,
  ];
  const query = newdatabase ? `UPDATE script SET graphicsid = ? WHERE ScriptID=?` : `UPDATE runorder SET MediaInsert = ? WHERE ScriptID=? AND NewsId=? `;
  try {
    await safeQuery(
      query,
      values
    );
    res.send("");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating graphics order");
  }
});

app.post("/updateGraphicsOrder", async (req, res) => {
  const { GraphicsID, GraphicsOrder } = req.body;
  const query = newdatabase ? `UPDATE graphics SET slno = ? where GraphicsID=?` : `UPDATE graphics SET GraphicsOrder = ? where GraphicsID=?`;
  try {
    await safeQuery(
      query,
      [GraphicsOrder, GraphicsID]
    );
    res.send("");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating graphics order");
  }
});

app.post("/updateGraphicTemplate", async (req, res) => {
  const query = newdatabase ? `UPDATE graphics SET gfxtemplatename = ? where GraphicsID=?` : `UPDATE graphics SET GraphicsTemplate = ? where GraphicsID=?`;
  const { GraphicsID, GraphicsTemplate } = req.body;
  if (!GraphicsID) {
    return res.status(400).send("GraphicsID is required");
  }
  try {
    await safeQuery(
      query,
      [GraphicsTemplate, GraphicsID]
    );
    res.send("Graphic updated successfully");
  } catch (error) {
    console.error("Error updating graphic template:", error);
    res.status(500).send("An error occurred while updating the graphic");
  }
});

app.post("/deleteGraphics", async (req, res) => {
  const { GraphicsID } = req.body;
  if (!GraphicsID) {
    return res.status(400).send("GraphicsID is required");
  }
  try {
    await safeQuery(`DELETE FROM graphics WHERE GraphicsID=?`, [GraphicsID]);
    res.send("Graphic deleted successfully");
  } catch (error) {
    console.error("Error deleting graphic:", error);
    res.status(500).send("An error occurred while deleting the graphic");
  }
});


// NRCS code ends

// start code for remotion
app.get("/show_runorderremotion", async (req, res) => {
  const param1 = req.query.param1;
  if (param1 === "") {
    res.status(500).send("Error fetching run order");
    return;
  }
  const query = `CALL c1news.show_runorder(?)`
  try {
    const [rows] = await safeQuery(query, [param1]);
    res.send(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching run order");
  }
});

// end code for remotion

//code start  for google translation

const { TranslationServiceClient } = require('@google-cloud/translate');
const credentialsforgooglecloud = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

const clientTranslation = new TranslationServiceClient({
  credentials: credentialsforgooglecloud,
});

function splitTextForTranslation(text, maxChars = 25000) {
  const chunks = [];
  let currentChunk = '';

  const sentenceDelimiterRegex = /(?<=[.?!।|۔])\s*/g;
  const sentences = text.split(sentenceDelimiterRegex);

  sentences.forEach((sentence) => {
    if ((currentChunk + sentence).length > maxChars) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += sentence + ' ';
    }
  });

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

app.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return res.status(400).json({ error: 'Text and target language are required.' });
  }

  try {
    const projectId = credentialsforgooglecloud.project_id;
    const location = 'global';
    const parent = `projects/${projectId}/locations/${location}`;

    const textChunks = splitTextForTranslation(text, 30000);

    const translatedChunks = await Promise.all(
      textChunks.map(async (chunk) => {
        const [response] = await clientTranslation.translateText({
          contents: [chunk],
          targetLanguageCode: targetLanguage,
          parent,
        });
        return response.translations[0].translatedText;
      })
    );

    const translatedText = translatedChunks.join(' ');

    res.json({ translatedText });
  } catch (error) {
    console.error('Translation API error:', error);
    res.status(500).json({ error: 'Failed to translate text.' });
  }
});




// code start for MOS

(async () => {
  try {
    await killPort(10540);
    await killPort(9000);

    console.log('✅ Ports cleared, starting server...');
    server2.listen(port, '::', () => {
      console.log(`✅ Node server is listening on port ${port} with HTTPS`);
    });

    const { startMosServer } = require('./mos-server');
    console.log('🔧 Starting MOS server...');
    await startMosServer();
    console.log('✅ MOS Server ready');
  } catch (err) {
    console.error('❌ Error starting app:', err);
  }
})();


// code end for MOS

//start code for web tele prompter

const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

// GET endpoint for /getlocalip
app.get('/getlocalip', (req, res) => {
  const ip = getLocalIP();
  res.json({ ip });
});

const shuttle = require('shuttle-control-usb');

shuttle.on('connected', (deviceInfo) => {
  console.log('Connected to ' + deviceInfo.name);
});

shuttle.on('buttondown', data => {
  io.emit('buttondown1', data);
});

shuttle.on('disconnected', data => {
  console.log(data);
});

shuttle.on('shuttle', data => {
  io.emit('shuttle1', data);
});

shuttle.on('jog-dir', (data1) => {
  io.emit('jog-dir1', data1);
});

shuttle.start();


io.on('connection', (socket) => {
  console.log('Socket Client connected', socket.id);
  socket.on('ServerConnectionStatus', (data) => {
    io.emit('ServerConnectionStatus2', data);
  });
  socket.emit("newdatabase", newdatabase);

  socket.on('currentStory1', (data) => {
    io.emit('currentStoryBroadcast', data);  // Broadcast to all clients
  });

  socket.on('databaseConnection1', (data) => {
    io.emit('databaseConnection', data);  // Broadcast to all clients
  });


  socket.on('currentStoryDropAllow1', (data) => {
    io.emit('currentStoryDropAllow', data);  // Broadcast to all clients
  });

  //from scroll page in caspar  start
  socket.on('setCurrentStoryNumber', (data) => {
    io.emit('setCurrentStoryNumber2', data);
  });

  socket.on('crossedLines', (data) => {
    io.emit('crossedLines2', data);
  });

  socket.on('storyLines', (data) => {
    io.emit('storyLines2', data);
  });

  socket.on('allContent', (data) => {
    io.emit('allContent2', data);
  });

  socket.on('setSlugs', (data) => {
    io.emit('setSlugs2', data);
  });

  socket.on('setStartPosition', (data) => {
    io.emit('setStartPosition2', data);
  });

  socket.on('setShowClock', (data) => {
    io.emit('setShowClock2', data);
  });

  socket.on('setNewsReaderText', (data) => {
    io.emit('setNewsReaderText2', data);
  });

  socket.on('rtl', (data) => {
    io.emit('rtl2', data);
  });
  socket.on('fontColor', (data) => {
    io.emit('fontColor2', data);
  });

  socket.on('fontBold', (data) => {
    io.emit('fontBold2', data);
  });

  socket.on('currentFont', (data) => {
    io.emit('currentFont2', data);
  });
  socket.on('scrollContainerStyle', (data) => {
    io.emit('scrollContainerStyle2', data);
  });
  socket.on('scrollingTextStyle', (data) => {
    io.emit('scrollingTextStyle2', data);
  });

  socket.on('offer', (data) => {
    socket.broadcast.emit('offer', data);
  });

  socket.on('answer', (data) => {
    socket.broadcast.emit('answer', data);
  });

  socket.on('candidate', (data) => {
    socket.broadcast.emit('candidate', data);
  });
  //webrtc code ends

  //for mobile
  socket.on('speed', (data) => {
    io.emit('speed2', data);
  });

  socket.on('next', () => {
    io.emit('next2', '');
  });

  socket.on('previous', () => {
    io.emit('previous2', '');
  });

  socket.on('fromStart', () => {
    io.emit('fromStart2', '');
  });


  //end for mbile

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    socket.removeAllListeners();
    socket.removeAllListeners('ServerConnectionStatus');
    socket.removeAllListeners("connect");
    socket.removeAllListeners("setCurrentStoryNumber");
    socket.removeAllListeners("crossedLines");
    socket.removeAllListeners("storyLines");
    socket.removeAllListeners("currentStory1");
    socket.removeAllListeners("allContent");
    socket.removeAllListeners("setSlugs");
    socket.removeAllListeners("setStartPosition");
    socket.removeAllListeners("setShowClock");
    socket.removeAllListeners("setNewsReaderText");
    socket.removeAllListeners("fontColor");
    socket.removeAllListeners("rtl");
    socket.removeAllListeners("scrollContainerStyle");
    socket.removeAllListeners("scrollingTextStyle");

    socket.removeAllListeners("speed");
    socket.removeAllListeners("next");
    socket.removeAllListeners("previous");
    socket.removeAllListeners("fromStart");


  });

});

//end code for web tele prompter

