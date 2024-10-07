import { Injectable } from '@nestjs/common'
import { initRabbitMQ } from 'src/init/init.rabitmq'

@Injectable()
export class CompanyQueue {
  sendToQueueCompany = async (data: any) => {
    try {
      const connection = initRabbitMQ()
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
          console.log('Queue and Exchange setup completed')
        }
      })
      await channel.sendToQueue('CompanyQueueProcess', Buffer.from(JSON.stringify(data)), {
        expiration: '5000'
      })
      await connection.close()
    } catch (error) {
      console.error('Error in queueCompany:', error)
    }
  }
}
