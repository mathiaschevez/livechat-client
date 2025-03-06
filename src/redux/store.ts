import { type TypedUseSelectorHook, useSelector as useUnsafeSelector, useDispatch as useUnsafeDispatch } from "react-redux";
import { configureStore } from '@reduxjs/toolkit'
import messagesReducer from './slices/messagesSlice'

export const store = configureStore({
  reducer: {
    messages: messagesReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useSelector: TypedUseSelectorHook<RootState> = useUnsafeSelector;
export const useDispatch: () => AppDispatch = useUnsafeDispatch;
