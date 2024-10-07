import { Prop } from '@nestjs/mongoose'
import mongoose from 'mongoose'

export class SampleSchema {
  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId
    email: string
  }

  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId
    email: string
  }

  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId
    email: string
  }

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date

  @Prop({ default: false })
  isDeleted: boolean

  @Prop()
  deletedAt: Date
}
