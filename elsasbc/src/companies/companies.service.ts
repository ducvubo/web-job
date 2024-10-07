import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { INDEX_NAME, INDEX_TYPE_COMPANIES } from 'src/constant/els.constant'

@Injectable()
export class CompaniesService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  async createCompany(data) {
    console.log('create')
    try {
      const newDoc = await this.elasticsearchService.index({
        index: `${INDEX_NAME}${INDEX_TYPE_COMPANIES}`,
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

  async updateCompany(data) {
    console.log('update')
    try {
      const newDoc = await this.elasticsearchService.update({
        index: `${INDEX_NAME}${INDEX_TYPE_COMPANIES}`,
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
