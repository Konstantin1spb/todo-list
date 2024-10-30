import { useEffect, useState } from 'react';
import { CreateTodoList, Todos } from './components';
import { requestServer } from './utils';
import styled from 'styled-components';

const AppContainer = ({ className }) => {
	const [todoLists, setTodoLists] = useState([]);
	const [updateTodos, setUpdateTodos] = useState(false);

	const onStorageUpdate = () => {
		const todoDataJSON = localStorage.getItem('todosData');
		const todoData = JSON.parse(todoDataJSON);
		setTodoLists(todoData);
	};

	useEffect(() => {
		window.addEventListener('storage', onStorageUpdate);

		requestServer('/todoLists')
			.then((res) => {
				setTodoLists(res);
				localStorage.setItem('todosData', JSON.stringify(res));
			})
			.catch((error) => console.log(error));

		return () => {
			window.removeEventListener('storage', onStorageUpdate);
		};
	}, [updateTodos]);

	return (
		<div className={className}>
			<CreateTodoList updateTodos={updateTodos} setUpdateTodos={setUpdateTodos} />
			<div className="todo-list">
				{todoLists.map(({ id, title, todos }) => {
					return (
						<Todos
							key={id}
							id={id}
							title={title}
							todos={todos}
							updateTodos={updateTodos}
							setUpdateTodos={setUpdateTodos}
						/>
					);
				})}
			</div>
		</div>
	);
};

export const App = styled(AppContainer)`
	.todo-list {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
`;
