import { createSlice } from '@reduxjs/toolkit';

// 초기값
const initialState = [];

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      return action.payload;
    },
    // actionCreator + reducer
    addTodo: (state, action) => {
      // 추가하기
      return [...state, action.payload];
    },
    removeTodo: (state, action) => {
      // 삭제하기
      return state.filter((item) => item.id !== action.payload);
    },
    switchTodo: (state, action) => {
      // 수정하기
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, isDone: !item.isDone };
        } else {
          return item;
        }
      });
    }
  }
});

export const { addTodo, removeTodo, switchTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
