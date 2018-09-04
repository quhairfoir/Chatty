import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const data = {
  currentUser: { name: 'Me!' }, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: 'Bob',
      content: 'Has anyone seen my marbles?'
    },
    {
      id: 2,
      username: 'Anonymous',
      content:
        'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
    }
  ]
};
//helper function to create random IDs for new messages
function ID () {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: data.messages,
      currentUser: data.currentUser || {},
      connection: {}
    };
    this.makeNewMessage = this.makeNewMessage.bind(this);
    // this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
    const connection = new WebSocket('ws://localhost:3001');
    connection.onopen = function(){
      console.log('Connected to server');
    };
    this.setState({connection})
  }

  makeNewMessage(content) {
    // const oldMessages = this.state.messages;
    // const newMessages = [...oldMessages, message];
    // this.setState({ messages: newMessages });
    const newMessage = {
      id: ID(),
      username: this.state.currentUser.name,
      content
    }
    this.sendMessage(newMessage);
  }

  sendMessage(message) {
    this.state.connection.send(JSON.stringify(message));
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
        <ChatBar currentUser={this.state.currentUser} makeNewMessage={this.makeNewMessage}/>
      </div>
    );
  }
}
