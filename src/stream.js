const express = require("express");

const port = 5000;
const app = express();

function prepareMessage(res, svt) {
    res.write(`data: ${JSON.stringify(svt)}\n\n`);
}
  
function setupServer(svt) {
    
    app.get("/stream", (req, res) => {
        console.log("New Connection!");
        res.set({
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
    
            // enabling CORS
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        });
  
        // const startTime = Date.now(); // in ms
  
  
        let eventInterval = setInterval(() => {
            // prepareMessage(res, svt, startTime);
            prepareMessage(res, svt);
        }, 200);
  
        req.on("close", (err) => {
            clearInterval(eventInterval);
            res.end();
        });
    });
  
    //LISTENER
    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
}

module.exports = 
    {
        setupServer
    };