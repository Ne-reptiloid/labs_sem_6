//Тут хранится текущее состояние

import { configureStore } from '@reduxjs/toolkit';//Импортируем всё, что нужно
import todoReducer from './todoSlice';//Импортируем todoSlice (другой файл из этой папки)

const store = configureStore({//Создаем Redux-хранилище
  reducer: {
    todos: todoReducer,
  },
});

export default store;
