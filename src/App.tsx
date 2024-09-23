import { ChangeEventHandler, MouseEventHandler, useRef, useState } from "react";
import "./App.css";
import Button from "./components/button/Button";
import Input from "./components/input/Input";
import { useEffect } from "react";

function App() {
  // refs and states
  const [writeTask, setWriteTask] = useState<string>("");
  const taskContainerRef = useRef<HTMLDivElement>(null);

  // input change eventHandler
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e): void => {
    setWriteTask(e.target.value);
  };

  //button click task adds
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    handleTaskAdd();
    setWriteTask("");
  };

  const handleTaskAdd = () => {
    if (writeTask.trim() !== "") {
      const newTask = document.createElement("div");
      const heading = document.createElement("h1");
      const cross = document.createElement("h2");
      heading.textContent = writeTask;
      cross.textContent = "X";
      heading.classList.add("headingClass");
      cross.classList.add("corss");
      newTask.appendChild(heading);
      newTask.appendChild(cross);
      newTask.classList.add("taskDiv");
      cross.addEventListener("click", () => {
        if (cross.parentElement) {
          cross.parentElement.remove();
        }
      });
      heading.addEventListener("click", () => {
        heading.classList.toggle("complete");
        newTask.classList.toggle("compDiv");
      });
      if (taskContainerRef.current) {
        taskContainerRef.current.appendChild(newTask);
      }
    }
  };

  //Cleat all task
  const handleClear = (): void => {
    if (taskContainerRef.current) {
      while (taskContainerRef.current.firstChild) {
        taskContainerRef.current.removeChild(
          taskContainerRef.current.firstChild
        );
      }
    }
    setWriteTask("");
  };

  //add the task on key press enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        console.log("first");
        handleTaskAdd();
        setWriteTask("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div id="main">
      <div id="card">
        <div id="hDiv">
          <h1>TODO LIST</h1>
          <h4>
            Click on the task name to mark as complete or cross to remove it
          </h4>
        </div>
        <div id="ib">
          <Input value={writeTask} onChange={handleInputChange} />
        </div>
        <div id="btnDiv">
          <Button onClick={handleClick} name="ADD" />
          <Button onClick={handleClear} name="Clear" />
        </div>
        <div ref={taskContainerRef} id="taskContainer"></div>
      </div>
    </div>
  );
}

export default App;
