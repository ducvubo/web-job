import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { INDEX_NAME, INDEX_TYPE_JOBS } from 'src/constant/els.constant'

@Injectable()
export class JobsService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  async createJob(data) {
    console.log('create')
    try {
      const newDoc = await this.elasticsearchService.index({
        index: `${INDEX_NAME}${INDEX_TYPE_JOBS}`,
        id: data._id,
        body: {
          ...data,
          _id: undefined
        }
      })
      console.log('newDoc', newDoc)
      return newDoc // Trả về kết quả để kiểm tra
    } catch (error) {
      console.error('Error indexing document:', error)
      throw error // Ném lỗi để dễ dàng phát hiện lỗi
    }
  }

  async updateJob(data) {
    console.log('update')
    try {
      const newDoc = await this.elasticsearchService.update({
        index: `${INDEX_NAME}${INDEX_TYPE_JOBS}`,
        id: data._id,
        body: {
          ...data,
          _id: undefined
        }
      })
      console.log('newDoc', newDoc)
      return newDoc // Trả về kết quả để kiểm tra
    } catch (error) {
      console.error('Error indexing document:', error)
      throw error // Ném lỗi để dễ dàng phát hiện lỗi
    }
  }
}
