import styled from 'styled-components';
import { H1 } from './h1';
import { Input } from './input';
import { Button } from './button';
import { useState } from 'react';
import { generateId, requestServer } from '../utils';

const CreateTodoListContainer = ({ className, updateTodos, setUpdateTodos }) => {
	const [listName, setListName] = useState('');

	const onListNameChange = ({ target }) => {
		setListName(target.value);
	};

	const onCreateListSubmit = (event) => {
		event.preventDefault();
		if (listName) {
			const id = generateId();
			const data = {
				id,
				title: listName,
				todos: [],
			};
			requestServer('/todoLists', 'POST', data).then(() => {
				setUpdateTodos(!updateTodos);
				setListName('');
			});
		}
	};

	return (
		<div className={className}>
			<H1>Create Todo list</H1>
			<form onSubmit={onCreateListSubmit} className="create-todo-list__controls">
				<Input
					name="list-name"
					type="text"
					value={listName}
					onChange={onListNameChange}
				/>
				<Button type="submit">Create list</Button>
			</form>
		</div>
	);
};

export const CreateTodoList = styled(CreateTodoListContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 30px;

	.create-todo-list__controls {
		display: flex;
		gap: 10px;
	}
`;
