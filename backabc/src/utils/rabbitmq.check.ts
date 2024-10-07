import { initRabbitMQ } from 'src/init/init.rabitmq'

export const connectQueueCompany = async () => {
  try {
    const connection = initRabbitMQ()
    connection.on('error', (err) => {
      console.error('connectionRabbitMQ - Connection company queue status: error', err)
    })
    connection.on('connect', () => {
      console.log('connectionRabbitMQ - Connection company queue status: connected')
    })
    const channel = connection.createChannel({
      json: true,
      setup: async (channel) => {
        const CompanyExchange = 'CompanyEx'
        const CompanyQueue = 'CompanyQueueProcess'
        const CompanyExChangeDLX = 'CompanyExDLX'
        const CompanyRoutingKeyDLX = 'CompanyRoutingKeyDLX'
        await channel.assertExchange(CompanyExchange, 'direct', {
          durable: true
        })
        const queueResult = await channel.assertQueue(CompanyQueue, {
          exclusive: false,
          deadLetterExchange: CompanyExChangeDLX,
          deadLetterRoutingKey: CompanyRoutingKeyDLX
        })
        await channel.bindQueue(queueResult.queue, CompanyExchange)
      }
    })
    await channel.sendToQueue('CompanyQueueProcess', Buffer.from(JSON.stringify('test')), {
      expiration: 1
    })

    await connection.close()
  } catch (error) {
    console.error('Error in queueCompany:', error)
  }
}

export const ConnectQueueJob = async () => {
  try {
    const connection = initRabbitMQ()

    connection.on('error', (err) => {
      console.error('connectionRabbitMQ - Connection job queue status: eror:', err)
    })
    connection.on('connect', () => {
      console.log('connectionRabbitMQ - Connection job queue status: connected')
    })

    const channel = connection.createChannel({
      json: true,
      setup: async (channel) => {
        const JobExchange = 'JobEx'
        const JobQueue = 'JobQueueProcess'
        const JobExChangeDLX = 'JobExDLX'
        const JobRoutingKeyDLX = 'JobRoutingKeyDLX'
        await channel.assertExchange(JobExchange, 'direct', {
          durable: true
        })
        const queueResult = await channel.assertQueue(JobQueue, {
          exclusive: false,
          deadLetterExchange: JobExChangeDLX,
          deadLetterRoutingKey: JobRoutingKeyDLX
        })
        await channel.bindQueue(queueResult.queue, JobExchange)
      }
    })
    await channel.sendToQueue('JobQueueProcess', Buffer.from(JSON.stringify('test')), {
      expiration: '1'
    })
    await connection.close()
  } catch (error) {
    console.error('Error in queueJob:', error)
  }
}
