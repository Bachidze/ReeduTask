import { TodoType } from '@/app/types';
import React from 'react';


interface TodoListProps {
  todos: TodoType[];
  handleDragStart: (index: number) => void
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  handleDrop: (index: number) => void
  handleDelete: (id: number) => void
  handleIsCompleted: (id: number) => void
  handleDownload: (todo: TodoType) => void
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDelete,
  handleIsCompleted,
  handleDownload,
}) => {
  return (
    <>
      {todos.map((el, index) => (
          <div
            key={el.id}
            className="flex flex-col w-full rounded-xl"
            style={{
              backgroundColor: el.isCompleted ? "red" : el.color,
            }}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            <h1>{el.name}</h1>
            <h1>{el.time}</h1>
            <div className="flex gap-2">
              <button onClick={() => handleDelete(el.id)}>Delete</button>
              <button onClick={() => handleIsCompleted(el.id)}>
                {el.isCompleted ? "isNotCompleted" : "Complete"}
              </button>
              <button onClick={() => handleDownload(el)}>Download</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default TodoList;
