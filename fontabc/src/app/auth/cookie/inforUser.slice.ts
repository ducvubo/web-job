import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface inforUserState {
  email: string
  gender: string
  name: string
  age: number
  address: string
}

const initialState: inforUserState = {
  email: '',
  gender: '',
  name: '',
  age: 0,
  address: ''
}

const inforUserSlice = createSlice({
  name: 'inforUser',
  initialState,
  reducers: {
    startAppUser: (state, action: PayloadAction<inforUserState>) => {
      ;(state.email = action.payload.email),
        (state.gender = action.payload.gender),
        (state.name = action.payload.name),
        (state.age = action.payload.age),
        (state.address = action.payload.address)
    }
  }
})

const inforUserReducer = inforUserSlice.reducer
export const { startAppUser } = inforUserSlice.actions
export default inforUserReducer
