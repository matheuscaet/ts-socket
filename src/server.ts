
import express = require("express");
import * as http from "http";
import { Server } from "socket.io";
import * as path from "path";



const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "../public")));
app.set("views", path.join(__dirname, "../public"));
app.engine("html", require("ejs").renderFile);
app.set("viem engine", "html");

app.use("/", (req, res) => {
    res.render("index.html")
});

let messages: Array<string> = [];

io.on("connection", (socket) => {
    console.log("cliente connection established: " + socket.id);
    socket.emit("prevMessages", messages);

    socket.on("sendMessage", (message) => {
        messages.push(message);
        socket.broadcast.emit("receivedMessage", message);
        console.log(message.username + ": " + message.message);
    })
})

server.listen(5000, () => {
    console.log("Server running at 5000 port");
})

