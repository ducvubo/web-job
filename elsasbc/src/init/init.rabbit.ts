import * as amqp from 'amqplib'

export const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_HOST)
    if (!connection) throw new Error('Connection not established')
    const channel = await connection.createChannel()
    return { channel, connection }
  } catch (error) {
    console.error('Error connecting to RabbitMQ', error)
    throw error
  }
}
