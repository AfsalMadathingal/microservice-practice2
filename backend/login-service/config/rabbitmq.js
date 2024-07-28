const amqp = require('amqplib');
const userModel = require('../model/userModel');
let channel;

async function connectRabbitMQ() {

  while(true){
    try {

      const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672');
      console.log('Connecting to RabbitMQ...');
      channel = await connection.createChannel();
      console.log('Connected to RabbitMQ');
      break;
    } catch (error) {
      console.error('Failed to connect to RabbitMQ', error);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
 
}

function getChannel() {
  if (!channel) throw new Error('RabbitMQ channel not established');
  return channel;
}

async function listenForNewUser() {
    const channel = getChannel();
    await channel.assertQueue('user_created');
    channel.consume('user_created', async (msg) => {
      if (msg !== null) {
        const user = JSON.parse(msg.content.toString());
        console.log('user_created :', user);
        const {_id, email, password} = user;
        const userReference = new userModel({_id, email, password});
        await userReference.save();
        console.log(`Initialized user document for  ${user}`);
        channel.ack(msg);
      }
    });
  }


module.exports = { connectRabbitMQ, getChannel , listenForNewUser} ;