import React, { useState, useRef } from "react";
import './TodoList.css';

import addIcon from '../assets/add.svg';
import deleteIcon from '../assets/delete.svg';

const AddTaskForm = ({ addTask }) => {
	const [value, setValue] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		value && addTask(value)
		setValue("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={value}
				placeholder="Enter task…"
				onChange={e => setValue(e.target.value)}
				id="addTaskInput"
			/>
			<button type="submit" id="submitButton">
				<img src={addIcon} alt="save" className="buttonIcon" />
			</button>
		</form>
	);
}

const TodoList = () => {

	const [tasks, setTasks] = useState([
		{
			text: "do laundry",
			isCompleted: false
		}, 
		{
			text: "buy food",
			isCompleted: false
		}
	]);
	const elementRefs = useRef([]);
	let [editInProgress, setEditInProgress] = useState([false]);
	let [activeIndex, setActiveIndex] = useState([-1]);

	const addTask = text => setTasks([...tasks, { text, isCompleted: false}]);

	const handleCheckboxStatus = index => {
		const newTasks = [...tasks];
		newTasks[index].isCompleted	= !newTasks[index].isCompleted;
		setTasks(newTasks);
	}

	const handleFocusInput = index => {
		setActiveIndex(index);
		setEditInProgress(true);
	}

	const handleUserInput = (index, e) => {
		const newTasks = [...tasks];
		newTasks[index].text = e.target.value;
		setTasks(newTasks);
	}

	const saveEdit = index => {
		const newTasks = [...tasks];
		newTasks[index].isReadOnly = true;
		setTasks(newTasks);
	}

	const removeTask = index => {
		const newTasks = [...tasks];
		newTasks.splice(index, 1);
		setTasks(newTasks);
	}

	return (
		<div className="todoList">
			<h2>React To-do List</h2>
			<AddTaskForm addTask={addTask} />
			
			{tasks.map((task, index) => (
				<div 
					key={index}
					className={`taskList ${(editInProgress && (activeIndex == index)) ? "editingTask" : ""}`}
				>	
					<input 
						id={index}
						className="customCheckbox"
						type="checkbox"
						checked={task.isCompleted}
						onChange={() => handleCheckboxStatus(index)}
					/>
					<label htmlFor={index}></label>	

					<div className="textItemContainer">
						<input 
							type="text"
							value={task.text}
							ref={(el) => elementRefs.current[index] = el}
							onFocus={() => handleFocusInput(index)}
							onChange={(e) => handleUserInput(index, e)}
							onBlur={() => saveEdit(index)}
						/>

						<button onClick={() => removeTask(index)} className="deleteButton">
							<img src={deleteIcon} alt="delete" className="buttonIcon" />
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default TodoList;