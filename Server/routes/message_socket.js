const express = require('express');
const router = express.Router();

var connect_db = require('../modules/connect_db.js');

const app = express();
const server = app.listen(8810);
const io = require('socket.io').listen(server);

io.on("connection", socket => {

    socket.on("new room", function(room) {
        socket.join(room);
    })

    socket.on("send message to server", function(messageContent) {
        console.log(messageContent);
        insertMessageToDB(messageContent);
        socket.to(messageContent.conversation_id).emit("send message to client", messageContent);
    })

})

// Thêm tin nhắn vào trong database
function insertMessageToDB(messageContent) {
    var query_insert_message = "INSERT INTO message (message_id, conversation_id, sending_id, receiving_id, content, type_of_message, time) VALUES";
    query_insert_message += " (NULL, '" + messageContent.conversation_id + "', '" + messageContent.sending_id + "', '" + messageContent.receiving_id + "', '" + messageContent.content + "', 'text', '" + messageContent.time + "')";
    
    connect_db.con.query(query_insert_message, function(err, result) {
        if(err) {
            throw err;
        }
    })
}

module.exports = router;