import {configureStore} from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector as rawUseSelector } from 'react-redux';
import commentSlice from '@/components/CommentsList/commentSlice'

export const store = configureStore({
    reducer: {
        comment: commentSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;