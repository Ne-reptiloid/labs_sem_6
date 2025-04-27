import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleComplete, deleteTodo } from "./todoSlice";

const Todo = () => {
    const [text, setText] = useState("");
    const [deadline, setDeadline] = useState("");
    const [completionDateFilter, setCompletionDateFilter] = useState("");
    const [completionFilter, setCompletionFilter] = useState("all");
    const [groupByDate, setGroupByDate] = useState(false);
    
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    const handleDeadlineChange = (e) => {
        setDeadline(e.target.value);
    };

    const parseDateInput = (dateStr) => {
        const parts = dateStr.split('.');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            const date = new Date(year, month, day);
            if (!isNaN(date.getTime())) {
                return date.toISOString().split('T')[0];
            }
        }
        return dateStr; 
    };

    const handleAddTodo = () => {
        if (text && deadline) {
            const formattedDeadline = parseDateInput(deadline);
            dispatch(addTodo({ text, deadline: formattedDeadline }));
            setText("");
            setDeadline("");
        }
    };

    const handleToggleComplete = (id) => {
        dispatch(toggleComplete(id));
    };

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    };

    const handleCompletionDateFilterChange = (e) => {
        setCompletionDateFilter(e.target.value);
    };

    const clearCompletionDateFilter = () => {
        setCompletionDateFilter("");
    };

    const handleCompletionFilterChange = (filter) => {
        setCompletionFilter(filter);
    };

    const toggleGroupByDate = () => {
        setGroupByDate(!groupByDate);
    };

    const getTextColor = (todo) => {
        if (todo.completed) return "#888";
        
        const today = new Date();
        const deadlineDate = new Date(todo.deadline);
        const timeDiff = deadlineDate.getTime() - today.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        if (dayDiff < 0) return "#ff0000";
        if (dayDiff <= 1) return "#ffcc00";
        return "#00aa00"; 
    };

    const formatDisplayDate = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? dateStr : 
            date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    // Фильтр по дате выполнения (только выполненные в указанную дату)
    const filteredByCompletionDate = completionDateFilter 
        ? todos.filter(todo => {
            const formattedFilter = parseDateInput(completionDateFilter);
            return todo.completed && todo.completedAt === formattedFilter;
        })
        : todos;

    const filteredTodos = completionFilter === "all"
        ? filteredByCompletionDate
        : completionFilter === "active"
            ? filteredByCompletionDate.filter(todo => !todo.completed)
            : filteredByCompletionDate.filter(todo => todo.completed);

    const groupedTodos = groupByDate
        ? filteredTodos.reduce((acc, todo) => {
            const date = formatDisplayDate(todo.deadline);
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(todo);
            return acc;
        }, {})
        : null;

    return (
        <div>
            <div>
                <input 
                    type="text" 
                    value={text} 
                    onChange={handleInputChange} 
                    placeholder="Введите текст задачи"
                />
                <div style={{ margin: "10px 0" }}>
                    <span>Введите дедлайн (ДД.ММ.ГГГГ или ГГГГ-ММ-ДД): </span>
                    <input 
                        type="text" 
                        value={deadline} 
                        onChange={handleDeadlineChange} 
                        placeholder="например, 31.12.2023"
                    />
                </div>
                <button onClick={handleAddTodo}>Добавить задачу</button>
            </div>

            <div>
                <h3>Фильтры</h3>
                <div>
                    <span>Фильтр по дате выполнения: </span>
                    <input 
                        type="text" 
                        value={completionDateFilter} 
                        onChange={handleCompletionDateFilterChange} 
                        placeholder="ДД.ММ.ГГГГ или ГГГГ-ММ-ДД"
                    />
                    <button onClick={clearCompletionDateFilter}>Сбросить фильтр</button>
                </div>
                <div>
                    <span>Фильтр по статусу: </span>
                    <button 
                        onClick={() => handleCompletionFilterChange("active")}
                        disabled={completionFilter === "active"}
                    >
                        Только активные
                    </button>
                    <button 
                        onClick={() => handleCompletionFilterChange("completed")}
                        disabled={completionFilter === "completed"}
                    >
                        Только завершённые
                    </button>
                    <button 
                        onClick={() => handleCompletionFilterChange("all")}
                        disabled={completionFilter === "all"}
                    >
                        Сбросить фильтр
                    </button>
                </div>
                <div>
                    <button onClick={toggleGroupByDate}>
                        {groupByDate ? "Отменить группировку" : "Группировать по дате"}
                    </button>
                </div>
            </div>

            {groupByDate ? (
                Object.entries(groupedTodos).map(([date, todosForDate]) => (
                    <div key={date}>
                        <h3>{date}</h3>
                        <ul>
                            {todosForDate.map((todo) => (
                                <li
                                    key={todo.id}
                                    style={{
                                        textDecoration: todo.completed ? "line-through" : "none",
                                        color: getTextColor(todo),
                                        margin: "5px 0"
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => handleToggleComplete(todo.id)}
                                    />
                                    {todo.text}
                                    <span style={{ marginLeft: "10px", color: "#888" }}>
                                        (Дедлайн: {formatDisplayDate(todo.deadline)})
                                    </span>
                                    {todo.completed && (
                                        <span style={{ marginLeft: "10px", color: "#888" }}>
                                            (Выполнено: {formatDisplayDate(todo.completedAt)})
                                        </span>
                                    )}
                                    <button 
                                        onClick={() => handleDeleteTodo(todo.id)}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Удалить
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <ul>
                    {filteredTodos.map((todo) => (
                        <li
                            key={todo.id}
                            style={{
                                textDecoration: todo.completed ? "line-through" : "none",
                                color: getTextColor(todo),
                                margin: "5px 0"
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleComplete(todo.id)}
                            />
                            {todo.text}
                            <span style={{ marginLeft: "10px", color: "#888" }}>
                                (Дедлайн: {formatDisplayDate(todo.deadline)})
                            </span>
                            {todo.completed && (
                                <span style={{ marginLeft: "10px", color: "#888" }}>
                                    (Выполнено: {formatDisplayDate(todo.completedAt)})
                                </span>
                            )}
                            <button 
                                onClick={() => handleDeleteTodo(todo.id)}
                                style={{ marginLeft: "10px" }}
                            >
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Todo;