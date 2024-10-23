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
			</form>
			{todos.map(({ id, title, done }) => {
				return (
					<div key={id}>
						<Input type="checkbox" />
						{title}
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
	}
`;
