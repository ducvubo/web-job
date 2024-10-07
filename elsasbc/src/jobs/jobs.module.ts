import { Module } from '@nestjs/common'
import { JobsService } from './jobs.service'
import { JobsController } from './jobs.controller'
import { connectToRabbitMQ } from 'src/init/init.rabbit'
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import { ConfigModule, ConfigService } from '@nestjs/config'
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get<string>('ELASTICSEARCH_HOST'),
        auth: {
          username: configService.get<string>('ELASTICSEARCH_USER'),
          password: configService.get<string>('ELASTICSEARCH_PASSWORD')
        },
        tls: {
          rejectUnauthorized: false
        }
      })
    })
  ],
  controllers: [JobsController],
  providers: [
    JobsService,
    {
      provide: 'RABBITMQ_CONNECTION',
      useFactory: async () => {
        const { connection, channel } = await connectToRabbitMQ()
        return { connection, channel }
      }
    }
  ]
})
export class JobsModule {}
