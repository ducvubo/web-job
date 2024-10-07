import { Controller, Inject, OnModuleInit } from '@nestjs/common'
import { CompaniesService } from './companies.service'

import { Channel } from 'amqplib'
import { connectToRabbitMQ } from 'src/init/init.rabbit'

@Controller()
export class CompaniesController implements OnModuleInit {
  constructor(
    private readonly companiesService: CompaniesService,
    @Inject('RABBITMQ_CONNECTION') private readonly rabbitMQConnection: { channel: Channel }
  ) {}

  async onModuleInit() {
    await this.consumeCompanyQueue()
    await this.consumeCompanyQueueFailed()
  }

  async consumeCompanyQueue() {
    const { channel } = this.rabbitMQConnection
    const companyQueue = 'CompanyQueueProcess'
    channel.consume(companyQueue, (msg: any) => {
      try {
        const bufferData = JSON.parse(msg.content.toString())

        if (bufferData && bufferData.data) {
          const jsonString = Buffer.from(bufferData.data).toString('utf-8')
          const parsedContent = JSON.parse(jsonString)
          this.handleMessage(parsedContent)
          channel.ack(msg)
        }
      } catch (error) {
        console.error('SEND company error::', error)
        channel.nack(msg, false, false)
      }
    })
  }

  async consumeCompanyQueueFailed() {
    const { channel } = await connectToRabbitMQ()
    const CompanyExChangeDLX = 'CompanyExDLX'
    const CompanyRoutingKeyDLX = 'CompanyRoutingKeyDLX'
    const notiQueueHandler = 'CompanyQueueHotFix'
    await channel.assertExchange(CompanyExChangeDLX, 'direct', {
      durable: true
    })
    const queueResult = await channel.assertQueue(notiQueueHandler, {
      exclusive: false
    })
    await channel.bindQueue(queueResult.queue, CompanyExChangeDLX, CompanyRoutingKeyDLX)
    await channel.consume(
      queueResult.queue,
      (msgFailed) => {
        const bufferData = JSON.parse(msgFailed.content.toString())
        if (bufferData && bufferData.data) {
          const jsonString = Buffer.from(bufferData.data).toString('utf-8')
          const parsedContent = JSON.parse(jsonString)
          this.handleMessage(parsedContent)
          channel.ack(msgFailed)
        }
      },
      {
        noAck: true
      }
    )
  }

  handleMessage(metaData: any) {
    const { action, data } = metaData
    switch (action) {
      case 'createCompany':
        this.companiesService.createCompany(data)
        break
      case 'updateCompany':
        this.companiesService.updateCompany(data)
        break
    }
  }
}
