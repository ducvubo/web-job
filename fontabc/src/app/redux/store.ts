import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../blog/blog.slice'
import { blogApi } from '../blog/blog.service'
import { setupListeners } from '@reduxjs/toolkit/query'
import { rtkQueryErrorLogger } from '../blog/middleware'
import inforUserReducer from '../auth/cookie/inforUser.slice'
import inforCompanyReducer from '../auth/cookie/inforCompany.slice'
// ...

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    inforUser: inforUserReducer,
    inforCompany: inforCompanyReducer,
    [blogApi.reducerPath]: blogApi.reducer //thêm reducer đuợc tạo từ api slice
  },
  //Thêm api middleware để enable các tính năng như caching, invalidation, polling của rtk query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware, rtkQueryErrorLogger)
})
// Optional, nhưng bắt buộc nếu muốn dùng tính năng refetchOnFocus và refetchOnReconnect
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
