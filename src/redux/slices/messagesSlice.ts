import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MessagesState {
  messages: string[] | null
}

const initialState: MessagesState = {
  messages: null,
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, action: PayloadAction<string[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<string>) => {
      if (state.messages === null) return;
      state.messages.push(action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { addMessages, addMessage } = messagesSlice.actions

export default messagesSlice.reducer