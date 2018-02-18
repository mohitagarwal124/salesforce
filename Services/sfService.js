const sForce = require('../Lib/sForce');

async function sfUrl() {
    try {
        const url = await sForce.authUrl();
        return url;
    } catch (error) {
        throw error;
    }
}

async function sfLogin(payload) {
    try {
        const conn = await sForce.login();
        conn.login(payload.username, payload.password + payload.token, function (err, userInfo) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log(conn.accessToken);
            console.log(conn.instanceUrl);
            // logged in user property
            console.log("User ID: " + userInfo.id);
            console.log("Org ID: " + userInfo.organizationId);
            global.connection = conn;
            sForce.sfStreming();
            return true;
        });
    } catch (error) {
        throw error;
    }
}

async function sfAuthorization(queryData) {
    try {
        const conn = sForce.connection();
        var code = queryData.code;
        conn.authorize(code, function (err, userInfo) {
            if (err) {
                throw err;
            }
            // Now you can get the access token, refresh token, and instance URL information.
            // Save them to establish connection next time.
            console.log(conn.accessToken);
            console.log(conn.refreshToken);
            console.log(conn.instanceUrl);
            console.log("User ID: " + userInfo.id);
            console.log("Org ID: " + userInfo.organizationId);
            global.connection = conn;
            sForce.sfStreming();
            return true;
        });
    } catch (error) {
        throw error;
    }
}

async function updateAccontData(payload) {
    try {
        const conn = global.connection;
        const name = payload.name;
        const id = payload.id;
        conn.sobject("Account").update({
            Id: id,
            Name: name
        }, function (err, ret) {
            if (err || !ret.success) {
                throw err;
            }
            return true;
        });
    } catch (error) {
        throw error;
    }
}

async function setAccountData(payload) {
    try {
        const conn = global.connection;
        const name = payload.name;
        conn.sobject("Account").create({ Name: name }, function (err, ret) {
            if (err || !ret.success) {
                throw err;
            }
            console.log("Created record id : " + ret.id);
            return { ID: ret.id };
        });
    } catch (error) {
        throw error;
    }
}

async function retrieveAccountData() {
    try {
        const conn = global.connection;
        return new Promise((resolve, reject) => {
            conn.query("SELECT Id, Name FROM Account", function (err, result) {
                if (err) {
                    resolve({ isErroe: true });
                }
                // console.log("total : " + result.totalSize);
                // console.log("fetched : " + result.records.length);
                // console.log(JSON.stringify(result.records));
                // console.log("done ? : " + result.done);
                if (!result.done) {
                    // you can use the locator to fetch next records set.
                    // Connection#queryMore()
                    console.log("next records URL : " + result.nextRecordsUrl);
                }
                resolve({ data: result.records });
            });
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sfUrl,
    sfAuthorization,
    sfLogin,
    setAccountData,
    retrieveAccountData,
    updateAccontData,
};