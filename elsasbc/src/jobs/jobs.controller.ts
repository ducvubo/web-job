import { Controller, Inject, OnModuleInit } from '@nestjs/common'
import { JobsService } from './jobs.service'
import { connectToRabbitMQ } from 'src/init/init.rabbit'
import { Channel } from 'amqplib'
@Controller()
export class JobsController implements OnModuleInit {
  constructor(
    @Inject('RABBITMQ_CONNECTION') private readonly rabbitMQConnection: { channel: Channel },
    private readonly jobService: JobsService
  ) {}
  async onModuleInit() {
    await this.consumeJobQueue()
    await this.consumeJobQueueFailed()
  }

  async consumeJobQueue() {
    const { channel } = this.rabbitMQConnection
    const jobQueue = 'JobQueueProcess'
    channel.consume(jobQueue, (msg: any) => {
      try {
        const bufferData = JSON.parse(msg.content.toString())

        if (bufferData && bufferData.data) {
          const jsonString = Buffer.from(bufferData.data).toString('utf-8')
          const parsedContent = JSON.parse(jsonString)
          this.handleMessage(parsedContent)
          channel.ack(msg)
        }
      } catch (error) {
        console.error('SEND job error::', error)
        channel.nack(msg, false, false)
      }
    })
  }

  async consumeJobQueueFailed() {
    const { channel } = await connectToRabbitMQ()
    const JobExChangeDLX = 'JobExDLX'
    const JobRoutingKeyDLX = 'JobRoutingKeyDLX'
    const notiQueueHandler = 'JobQueueHotFix'
    await channel.assertExchange(JobExChangeDLX, 'direct', {
      durable: true
    })
    const queueResult = await channel.assertQueue(notiQueueHandler, {
      exclusive: false
    })
    await channel.bindQueue(queueResult.queue, JobExChangeDLX, JobRoutingKeyDLX)
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
      case 'createJob':
        this.jobService.createJob(data)
        break
      case 'updateJob':
        this.jobService.updateJob(data)
        break
    }
  }
}
