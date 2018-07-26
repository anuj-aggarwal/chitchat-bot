# ChitChat Bot

[![NPM](https://nodei.co/npm/chitchat-bot.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/chitchat-bot/)

> A Node.js wrapper for ChitChat Bot API

This package allows user to create Node Chat Bots for the Chatting Web Application [ChitChat](https://chit-chat-node.herokuapp.com).

## Getting Started

### Prerequisites

You need a username and Client Secret for your Bot before building Bots for the Application.
In order to get those credentials, just Register on the Website [ChitChat](https://chit-chat-node.herokuapp.com), and click Create a new Bot to get the Client Secret for your new Bot.

### Installation

Install using NPM:
```
npm install chitchat-bot
```

Or, directly using Git:
```
cd ./node_modules
git clone https://github.com/anuj-aggarwal/chitchat-bot.git
```

## Setup

```
// Require the Library
const ChitChatBot = require("chitchat-bot");

// Create a new Bot
// username: username of Bot supplied while creting bot
// clientSecret: Client Secret for Bot given on creation of Bot
const myBot = new ChitChatBot(username, clientSecret);
```

## Usage

Private Chats:
```
// Sets up Event Listener to listen for New Chats
myBot.onNewChat((username) => {
    // Can get Called Multiple Times for same username
    console.log(`New Chat: ${username}`);
});

// Sets up Event Listener to listen for New User Messages
myBot.onUserMessage(({ username, sender, body }) => {
    // Handle The New Message
});

// Sets up Event Listener to listen for Unread Messages Event called with messages sent while Bot was inactive
myBot.onUnreadMessages((messages) => {
    // messages is an array of Message
    // Each Message has: username, sender, body
});

// Send a message to a private Chat
myBot.messageUser(username, messageBody);
```

Channels:
```
// Join a Channel
myBot.joinChannel(channelName);

// Sets up Event Listener for Channel Members sent whenever the members change
myBot.onChannelMembers(({channel, members}) => {
    // channel: Name of Channel
    // members is an array of usernames of members of the channel
});

// Sets up Event Listener for Channel Alerts sent
myBot.onChannelAlert(({ channel, body }) => {
    // Handle the Alert
});

// Sets up Event Listener to listen for New Channel Messages
myBot.onChannelMessage(({ channel, sender, body, for }) => {
    // Handle The New Message
    // channel: Name of Channel
    // sender: Sender of Message
    // body: Message Body
    // for: List of usernames this message was meant for(empty if meant for all)
});

// Send a message to a Channel
myBot.messageUser(channelName, body, forList);
// forList: list of usernames to show this message to([] if meant for all)
```

## Built With

* [Socket.io-Client](https://socket.io/) - Used for Managing Web Sockets