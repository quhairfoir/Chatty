import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentUser: {name: 'Anonymous'},
      color: '',
      connection: {},
      clients: {}
    };
    this.makeNewMessage = this.makeNewMessage.bind(this);
    this.addNewMessage = this.addNewMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  addNewMessage(message) {
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, message];
    this.setState({ messages: newMessages });
  }

  setUsername(name) {
    const oldName = this.state.currentUser.name;
    const newName = name;
    const message = `${oldName} changed their name to ${newName}`
    this.makeNewMessage(message, 'postNotification')
    this.setState({currentUser: {name}});
  }

  makeNewMessage(content, type) {
    const username = (type === 'postMessage') ? this.state.currentUser.name : 'Anonymous';
    const newMessage = {
      type,
      username,
      content,
      color: this.state.color
    };
    this.sendMessage(newMessage);
  }

  sendMessage(message) {
    this.state.connection.send(JSON.stringify(message));
  }

  handleMessage(event) {
    let message = JSON.parse(event.data);
    console.log(message);
    if (message.type === 'incomingClientData') {
     return this.setState({clients: message.clientList })
    } else if (message.type === 'me'){
      let color = message.color;
      console.log(color);
      return this.setState({color: color});
    }
    this.addNewMessage(message)
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      const newMessage = {
        id: 3,
        username: 'Michelle',
        content: 'Hello there!',
        type: 'incomingMessage',
        color: '#E479F2'
      };
      const messages = this.state.messages.concat(newMessage);
      this.setState({ messages: messages });
    }, 3000);
    const connection = new WebSocket('ws://localhost:3001');
    connection.onopen = function() {
      console.log('Connected to server');
    };
    this.setState({ connection });
    connection.onmessage = this.handleMessage;
    }

  render() {
    return (
      <div>
        <Nav clients={this.state.clients}/>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          makeNewMessage={this.makeNewMessage}
          setUsername={this.setUsername}
          alertNameChange={this.alertNameChange}
        />
      </div>
    );
  }
}
