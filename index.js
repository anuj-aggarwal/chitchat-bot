const socketIo = require("socket.io-client");

// ChitChat Bot Class to Instantiate
class ChitChatBot {
    // Initializes Socket Connection with ChitChat Application with specified Credentials
    constructor(username, clientSecret) {
        if (typeof username != "string")
            throw new Error("Username must be a String!");
        if (typeof clientSecret != "string")
            throw new Error("Provide a valid Client Secret!");

        // Connect to ChitChat Application
        this.io = socketIo("https://chit-chat-node.herokuapp.com/bots");
        // If user is Authenticated or not
        this.isAuthenticated = false;
        // All channels joined currently by the Bot
        this.channels = {};

        // Send Authentication Data to App
        this.authorize(username, clientSecret);
    }

    // Sends Authentication Data to ChitChat
    // and sets up Authentication Success and Failure Event Listeners
    // Throws Error on Authentication Failure
    authorize(username, clientSecret) {
        this.io.on("connect", () => {
            this.io.emit("auth data", {
                username,
                secret: clientSecret
            });
        });

        // Set Authenticated to true on Successful authentication
        this.io.on("authenticated", () => {
            this.isAuthenticated = true;
        });

        // Throw Error on Auth Failure
        this.io.on("auth error", err => {
            throw new Error(`Authentication Failed: ${err}`);
        });
    }

    // Event Handler for New Chat initiated by a User
    // handler is called with username of user
    onNewChat(handler) {
        this.io.on("new chat", ({ username }) => {
            handler(username);
        });
    }

    // Event Handler for messaging to a User
    messageUser(username, message) {
        this.io.emit("message user", {
            username,
            body: message
        });
    }

    // Event Handler for New Message by any User in Private Chat
    // handler is called with message of user containing sender and body of message
    onUserMessage(handler) {
        this.io.on("user message", message => {
            handler(message);
        });
    }

    // Event Handler for Unread Messages of any User in Private Chat
    // handler is called with messages of users each containing sender and body of message
    onUnreadMessages(handler) {
        this.io.on("unread messages", messages => {
            handler(messages);
        });
    }

    // Function to join a Channel
    joinChannel(channelName) {
        this.io.emit("join channel", channelName);
    }

    // Event Handler for All Members of a Channel
    // handler is called with members of the Channel
    onChannelMembers(handler) {
        this.io.on("Members", members => {
            handler(members);
        });
    }

    // Event Handler for New Alert in any Channel
    // handler is called with alert message of channel containing Channel Name, Sender and body
    onChannelAlert(handler) {
        this.io.on("alert", alertMessage => {
            handler(alertMessage);
        });
    }

    // Event Handler for New Message in any Channel
    // handler is called with alert message of channel containing Channel Name, Sender, for and body
    onChannelMessage(handler) {
        this.io.on("channel message", message => {
            handler(message);
        });
    }

    // Function to Send a message to a Channel
    messageChannel(channelName, body, forList) {
        this.io.emit("message channel", {
            channel: channelName,
            body,
            for: forList
        });
    }
}


module.exports = ChitChatBot;