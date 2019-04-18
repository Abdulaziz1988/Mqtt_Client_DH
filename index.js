const mqtt = require('mqtt');
    
const client  = mqtt.connect('mqtt://localhost:1883');

const authObj = {
    action: 'authenticate',
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7ImEiOlswXSwiZSI6MTU1NDk3Mzk4NTc4OSwidCI6MSwidSI6MSwibiI6WyIqIl0sImR0IjpbIioiXX19.ktggNTGYXNrA59DtQ5Ov6ZVWbR3XuL-aidSv133RiCg',
    requestId: '12345'
 }

client.on('message', function (topic, message) {
    const messageObject = JSON.parse(message.toString());
    
    if (messageObject.requestId === '12345') {
        if (messageObject.status === 'success') {
            //client authenticated
            console.log(messageObject);
        }
    }
});

client.on('connect', () => {
    client.subscribe('dh/response/authenticate@' + client.options.clientId);
    
    client.publish('dh/request', authObj.toString());
    console.log("Connected");
    
});

client.on('error', () => {
    //error handler
    console.log("ERROR");
});