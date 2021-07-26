import React, { useState, useRef } from "react";

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
			/>
			<button type="submit">
				submit
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

	const addTask = text => setTasks([...tasks, { text, isCompleted: false}]);

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
			<AddTaskForm addTask={addTask} />
			
			{tasks.map((task, index) => (
				<div key={index}>	
					<div>
						<input 
							type="text"
							value={task.text}
							ref={(el) => elementRefs.current[index] = el}
							onChange={(e) => handleUserInput(index, e)}
							onBlur={() => saveEdit(index)}
						/>

					<button onClick={() => removeTask(index)}>
						delete
					</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default TodoList;