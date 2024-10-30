import styled from 'styled-components';
import { H3 } from './h3';
import { Input } from './input';
import { Button } from './button';
import { useState } from 'react';
import { generateId, requestServer } from '../utils';

const TodosContainer = ({ className, id, title, todos, updateTodos, setUpdateTodos }) => {
	const [todoName, setTodoName] = useState('');

	const onTodoChange = ({ target }) => {
		setTodoName(target.value);
	};

	const onCreateTodoSubmit = (event) => {
		event.preventDefault();
		if (todoName) {
			const todoId = generateId();
			const updatedTodos = todos;
			updatedTodos.push({ id: todoId, title: todoName, done: false });
			const data = {
				todos: updatedTodos,
			};
			requestServer(`/todoLists/${id}`, 'PATCH', data).then(() => {
				setUpdateTodos(!updateTodos);
				setTodoName('');
			});
		}
	};

	const onDeleteTodoListClick = () => {
		requestServer(`/todoLists/${id}`, 'DELETE').then(() => {
			setUpdateTodos(!updateTodos);
		});
	};

	const onDoneChange = (todoId, done) => {
		const findedTodoIndex = todos.findIndex(({ id }) => todoId === id);
		const updatedTodos = todos;
		updatedTodos[findedTodoIndex].done = !done;
		requestServer(`/todoLists/${id}`, 'PATCH', { todos: updatedTodos }).then(() => {
			setUpdateTodos(!updateTodos);
		});
	};

	const onDeleteTodoClick = (todoId) => {
		const findedTodoIndex = todos.findIndex(({ id }) => todoId === id);
		const updatedTodos = todos;
		updatedTodos.splice(findedTodoIndex, 1);
		requestServer(`/todoLists/${id}`, 'PATCH', { todos: updatedTodos }).then(() => {
			setUpdateTodos(!updateTodos);
		});
	};

	return (
		<div className={className}>
			<H3>{title}</H3>
			<form onSubmit={onCreateTodoSubmit} className="create-todo__controls">
				<Input
					name="todo-name"
					type="text"
					value={todoName}
					onChange={onTodoChange}
				/>
				<Button type="submit">Add todo</Button>
				<Button onClick={onDeleteTodoListClick}>Delete</Button>
			</form>
			{todos.map(({ id, title, done }) => {
				return (
					<div className="todo" key={id}>
						<Input
							type="checkbox"
							checked={done ? true : false}
							onChange={() => onDoneChange(id, done)}
						/>
						{title}
						<Button padding="0" onClick={() => onDeleteTodoClick(id)}>
							Delete
						</Button>
					</div>
				);
			})}
		</div>
	);
};

export const Todos = styled(TodosContainer)`
	.create-todo__controls {
		display: flex;
		gap: 10px;
		margin-bottom: 15px;
	}

	.todo {
		display: flex;
		gap: 10px;
		margin-bottom: 10px;
	}
`;
