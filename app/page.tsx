"use client";
import React, { useState, useEffect } from "react";
import { TodoType } from "./types";
import TodoList from "@/components/TodoList";
import ShowSelected from "@/components/ShowSelected";

export default function Home() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState<TodoType[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const colors = ["red", "blue", "green", "orange"];
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodo(JSON.parse(storedTodos));
    }
  }, []);

  // Update localStorage whenever the todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "" || selectedColor === "") {
      return;
    }
    const TodoObject = {
      name: input,
      id: Math.random(), // Consider switching to a unique ID generator like uuid
      time: new Date().toLocaleTimeString(),
      isCompleted: false,
      color: selectedColor,
    };
    setTodo((prev) => [...prev, TodoObject]);
    setInput("");
  };

  const catchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleDelete = (id: number) => {
    setTodo((prev) => prev.filter((el) => el.id !== id));
  };

  const handleIsCompleted = (id: number) => {
    setTodo((prev) =>
      prev.map((el) => (el.id === id ? { ...el, isCompleted: !el.isCompleted } : el))
    );
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const toggleShowColors = () => {
    setShowColors((prev) => !prev);
  };

  const handleDownload = (todo: TodoType) => {
    const todoData = `
      Todo Name: ${todo.name}\n
      Time: ${todo.time}\n
      Status: ${todo.isCompleted ? "Completed" : "Not Completed"}
    `;

    const blob = new Blob([todoData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${todo.name}.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggingIndex === null) return;

    const draggedTodo = todo[draggingIndex];
    const updatedTodos = todo.filter((_, idx) => idx !== draggingIndex);
    updatedTodos.splice(index, 0, draggedTodo);

    setTodo(updatedTodos);
    setDraggingIndex(null);
  };

  return (
    <>
      <main className="flex m-auto flex-col w-[90%] gap-2">
        <ShowSelected
          selectedColor={selectedColor}
          showColors={showColors}
          colors={colors}
          handleColorSelect={handleColorSelect}
          handleSubmit={handleSubmit}
          catchInput={catchInput}
          input={input}
          toggleShowColors={toggleShowColors}
        />
        <TodoList
          todos={todo}
          handleDelete={handleDelete}
          handleIsCompleted={handleIsCompleted}
          handleDownload={handleDownload}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
        />
      </main>
    </>
  );
}
