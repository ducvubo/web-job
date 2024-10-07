import { Injectable } from '@nestjs/common'
import { IDataQueueJob } from 'src/constant/queue.interface'
import { initRabbitMQ } from 'src/init/init.rabitmq'

@Injectable()
export class JobQueue {
  sendToQueueJob = async <T>(data: IDataQueueJob<T>) => {
    try {
      const connection = initRabbitMQ()
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
          console.log('Queue and Exchange setup completed')
        }
      })
      await channel.sendToQueue('JobQueueProcess', Buffer.from(JSON.stringify(data)), {
        expiration: 50000
      })
      await connection.close()
    } catch (error) {
      console.error('Error in queueJob:', error)
    }
  }
}
