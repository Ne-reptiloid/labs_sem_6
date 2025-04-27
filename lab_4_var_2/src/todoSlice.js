//Тут хранится слайс
//Слайс - то, что обновляет состояние при определенных действиях

import { createSlice } from "@reduxjs/toolkit"//Импорт необходимой функции "createSlice" из библиотеки "@reduxjs/toolkit"

const todoSlice = createSlice({//Создаем слайс
    name: "todos",//Имя слайса
    initialState: [],//Начальное состояние (в данном случае - ничего)
    reducers: {

        //Тут будут разные редукторы (что со списком можно делать)

        addTodo: (state, action) => {// 1. Добавляет задание
            const newTodo = {
              id: Date.now(),//Генерирует id задания на основе текущего времени
              text: action.payload,//Текст задания
              completed: false,//Начальное состояние - "Невыполнено"
            };
            state.push(newTodo);
          },
        
        
        toggleComplete: (state, action) => {// 2. Меняет с невыполненного на выполнено
            const todo = state.find((todo) => todo.id === action.payload);//Находит значение по id
            if (todo) {
              todo.completed = !todo.completed;//Если было невыполнено, ставит выполнено
            }
          },

        deleteTodo: (state, action) => {// 3. Удаляет задание
            const index = state.findIndex((todo) => todo.id === action.payload);//Находит по id
            if (index !== -1) {
              state.splice(index, 1);//Удаляет
            }
          },         
    },
  });

//Экспортируем всё, чтобы можно было использовать в других частях приложения
export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
