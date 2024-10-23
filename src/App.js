import { useEffect, useState } from 'react';
import { CreateTodoList, Todos } from './components';
import { requestServer } from './utils';

const App = () => {
	const [todoLists, setTodoLists] = useState([]);
	const [updateTodos, setUpdateTodos] = useState(false);

	useEffect(() => {
		requestServer('/todoLists')
			.then((res) => setTodoLists(res))
			.catch((error) => console.log(error));
	}, [updateTodos]);

	return (
		<>
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
		</>
	);
};

export default App;
