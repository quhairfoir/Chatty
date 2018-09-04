import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentUser: {},
      connection: {}
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
    this.setState({currentUser: {name}});
  }

  makeNewMessage(content) {
    const newMessage = {
      username: this.state.currentUser.name,
      content
    };
    this.sendMessage(newMessage);
  }

  sendMessage(message) {
    this.state.connection.send(JSON.stringify(message));
  }

  handleMessage(event) {
    let message = JSON.parse(event.data);
    console.log(message);
    this.addNewMessage(message);
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      const newMessage = {
        id: 3,
        username: 'Michelle',
        content: 'Hello there!'
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
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>
            Chatty
          </a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          makeNewMessage={this.makeNewMessage}
          setUsername={this.setUsername}
        />
      </div>
    );
  }
}
