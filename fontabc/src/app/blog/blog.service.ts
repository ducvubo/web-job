import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from './blog.type'
import { CustomError } from '../utils/helpers'

export const blogApi = createApi({
  reducerPath: 'blogApi', //Tên field trong redux state
  tagTypes: ['Posts'], // Những kiểu tag cho phép dùng trong blogApi
  keepUnusedDataFor: 10, //Thời gian giữ data trong cache
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    prepareHeaders(headers) {
      headers.set('authorization', 'Bearer token')
      return headers
    }
  }),
  endpoints: (build) => ({
    //Generic type type theo thuws tu là kiểu response và argument
    getPosts: build.query<Post[], void>({
      query: () => 'posts', //method khong co argument
      //http://localhost:4000/posts
      providesTags(result) {
        //callback se chạy mỗi hi getPosts chạy
        //mong muốn là sẻ return về 1 mảng kiểu
        //interface Tags: {
        //  type: 'Posts',
        //  id: string
        //}[]
        //vì thế phải thêm as const để báo hiệu type lad readOnly, không thể mutate
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
            { type: 'Posts' as const, id: 'LIST' }
          ]
          return final
        }
        // const final = [{ type: 'Posts' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Posts', id: 'LIST' }]
      }
    }),
    addPost: build.mutation<Post, Omit<Post, 'id'>>({
      //response trả về là 1 post, argument là 1 post không có id
      query(body) {
        try {
          return {
            url: 'posts',
            method: 'POST',
            body
          }
        } catch (error: any) {
          throw new CustomError(error.message)
        }
      },
      //invalidatesTags: cung cấp các tag để báo hiệu cho những method nào có providerTags match se bị gọi lại trong trường hợp này getPosts sẽ bị gọi lại
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Posts', id: 'LIST' }])
    }),
    getPost: build.query<Post, string>({
      //response trả về là 1 post, argument là 1 string
      query: (id) => ({
        url: `posts/${id}`,
        headers: {
          hello: 'world'
        },
        params: {
          first_name: 'John',
          last_name: id
        }
      })
      // keepUnusedDataFor: 10,//thời gian giữ data trong cache
    }),
    updatePost: build.mutation<Post, { id: string; body: Post }>({
      query(data) {
        return {
          url: `posts/${data.id}`,
          method: 'PUT',
          body: data.body
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts', id: data.id }])
    }),
    deletePost: build.mutation<{}, string>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }]
    })
  })
})

export const { useGetPostsQuery, useAddPostMutation, useGetPostQuery, useUpdatePostMutation, useDeletePostMutation } =
  blogApi
