// server.js
const uuidv1 = require('uuid/v1');
const randomColor = require('random-color');

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${PORT}`))

// Create the WebSockets server
const wss = new SocketServer({ server });

let clients = {
  type: 'incomingClientData',
  clientList: {}
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the client parameter in the callback.
wss.on('connection', client => {
  // helper function to send all message types
  const broadcastMessage = message => {
    wss.clients.forEach(function each(client) {
        client.send(message);
    });
  };

  // helper function to handle new client connection
  const clientConnected = (client, clientID) => {
    clients.clientList[clientID] = {
      clientID,
      color: randomColor().hexString()
    }
    let user = clients.clientList[clientID];
    user.type = 'me';
    client.send(JSON.stringify(user));
    broadcastMessage(JSON.stringify(clients))
  }

  // set a user id for newly connected client, then:
  // uses above helper function to set user id and add 
  // to client list on connection
  const clientID = uuidv1();
  clientConnected(client, clientID);

  // processes incoming messages and broadcasts back
  client.on('message', function incoming(data) {
    const message = JSON.parse(data);
    const type =
      message.type === 'postMessage'
        ? 'incomingMessage'
        : 'incomingNotification';
    const newMessage = {
      type,
      id: uuidv1(),
      username: message.username,
      content: message.content,
      color: message.color
    };
    const messageString = JSON.stringify(newMessage);
    broadcastMessage(messageString);
  });  

  // function to remove user from list and cbroadcast disconnection  
  const clientDisconected = clientID => {
    const client = clients.clientList[clientID]
    if (!client) return // catch race condition
    console.log(`<< (${clientID}) disconnected`)
    delete clients.clientList[clientID]
    broadcastMessage(JSON.stringify(clients))
  }

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    clientDisconected(clientID);
  });

});
