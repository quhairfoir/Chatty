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
    console.log(`Listening on ${PORT}`)
  );

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
  console.log('Client connected');

  const broadcastMessage = message => {
    wss.clients.forEach(function each(client) {
      // if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      // }
    });
  };

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

  const clientID = uuidv1();
  clientConnected(client, clientID);
  console.log('Clients:\n', clients.clientList);


  client.on('message', function incoming(data) {
    const message = JSON.parse(data);
    const type =
      message.type === 'postMessage'
        ? 'incomingMessage'
        : 'incomingNotification';
    console.log(`User ${message.username}, who has color ${message.color} said ${message.content}`)
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

  // broadcasts disconnection message 
  const clientDisconected = clientId => {
    const client = clients.clientList[clientId]
    if (!client) return // catch race condition
    console.log(`<< (${clientId}) disconnected`)
    delete clients.clientList[clientId]
    broadcastMessage(JSON.stringify(clients))
  }

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    console.log('Client disconnected');
    clientDisconected(clientID);
  });

});
