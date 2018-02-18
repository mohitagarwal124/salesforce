const jsforce = require('jsforce');
const config = require('../Config');

class sForce {
    static login(username, password, token) {
        const conn = new jsforce.Connection({
            // you can change loginUrl to connect to sandbox or prerelease env.
            loginUrl: config.SALESFORCE.LOGIN_URL,
        });
        return conn;
    }
    static oauth() {
        const oauth2 = new jsforce.OAuth2({
            loginUrl: config.SALESFORCE.LOGIN_URL,
            clientId: config.SALESFORCE.CONSUMER_KEY,
            clientSecret: config.SALESFORCE.CONSUMER_SECRET,
            redirectUri: config.SALESFORCE.URL
        });
        return oauth2;
    }
    static authUrl() {
        const oauth = this.oauth();
        return oauth.getAuthorizationUrl()
    }
    static connection() {
        const oauth2 = this.oauth();
        const conn = new jsforce.Connection({ oauth2: oauth2 });
        return conn;
    }
    static sfStreming() {
        console.log('called');
        global.connection.streaming.topic("AccountUpdatess").subscribe(function (message) {
            console.log('Event Type : ' + message.event.type);
            console.log('Event Created : ' + message.event.createdDate);
            console.log('Object Id : ' + message.sobject.Id);
            console.log(message);
        });
    }
}

module.exports = sForce;