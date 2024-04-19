import React, { useState, useEffect } from "react";
import axios from "axios";

function WorkingWithArrays() {

    const API_BASE = process.env.REACT_APP_API_BASE;
    const API = `${API_BASE}/a5/todos`;

    const [errorMessage, setErrorMessage] = useState(null);
    const [todo, setTodo] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });
    // const [todos, setTodos] = useState<{ id: number, title: string, description: string, due: string, completed: boolean }[]>([]);
    const [todos, setTodos] = useState<any[]>([]);
    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data as { id: number, title: string, description: string, due: string, completed: boolean }]);
    };
    // const fetchTodos = async () => {
    //     const response = await axios.get(API);
    //     setTodos(response.data as { id: number, title: string, description: string, due: string, completed: boolean }[]);
    // };
    const removeTodo = async (todo: { id: number }) => {
        const response = await axios
            .delete(`${API}/${todo.id}`);
        setTodos(response.data as { id: number, title: string, description: string, due: string, completed: boolean }[]);
    };
    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };
    const updateTitle = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    };
    const deleteTodo = async (todo: any) => {
        try {
            const response = await axios.delete(
                `${API}/${todo.id}`);
            if (response) {}
            setTodos(todos.filter((t) => t.id !== todo.id));
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };
    const updateTodo = async () => {
        try {
            const response = await axios.put(
                `${API}/${todo.id}`, todo);
            if (response) {}
            setTodos(todos.map((t) => (
                t.id === todo.id ? todo : t)));
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };
    const fetchTodoById = async (id: any) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };
    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get(API);
            setTodos(response.data as { id: number, title: string, description: string, due: string, completed: boolean }[]);
        };
        fetchTodos();
    }, [API]);

    // const API = "http://localhost:4000/a5/todos";

    return (
        <div>
            <h3>Working with Arrays</h3>
            <br />
            <h4>Retrieving Arrays</h4>
            <a className="
                btn btn-primary
            " href={API}>
                Get Todos
            </a>
            <br /><br />
            <h4>Retrieving an Item from an Array by ID</h4>
            <input className="
                form-control
            " value={todo.id} type="number"
                onChange={(e) => setTodo({
                    ...todo,
                    id: parseInt(e.target.value)
                })} />
            <br />
            <a className="
                btn btn-primary
            " href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>
            <br /><br />
            <input className="
                form-control
            " type="text" value={todo.title}
                onChange={(e) => setTodo({
                    ...todo, title: e.target.value
                })} />
            <br />
            <button className="
                btn btn-primary
            " onClick={updateTitle} >
                Update Title
            </button>
            <br /><br />
            <textarea className="
                form-control
            " value={todo.description}
                onChange={(e) => setTodo({
                    ...todo,
                    description: e.target.value
                })} />
            <br />
            <input className="
                form-control
            " value={todo.due} type="date"
                onChange={(e) => setTodo({
                    ...todo, due: e.target.value
                })} />
            <br />
            <label>
                <input value={todo.completed.toString()} type="checkbox"
                    onChange={(e) => setTodo({
                        ...todo, completed: e.target.checked
                    })} />
                Completed
            </label>
            <br /><br />
            <button className="
                btn btn-primary
            " onClick={postTodo}> Post Todo </button>
            <br /><br />
            <button className="
                btn btn-primary
            " onClick={updateTodo}>
                Update Todo
            </button>
            <br /><br />
            <h3>Updating an Item in an Array</h3>
            <a className="btn btn-primary" href={`${API}/${todo.id}/title/${todo.title}`} >
                Update Title to {todo.title}
            </a>
            <br /><br />
            <h3>Filtering Array Items</h3>
            <a className="btn btn-primary" href={`${API}?completed=true`}>
                Get Completed Todos
            </a>
            <br /><br />
            <h3>Creating new Items in an Array</h3>
            <a className="btn btn-primary"  href={`${API}/create`}>
                Create Todo
            </a>
            <br /><br />

            <h3>Deleting from an Array</h3>
            <a className="btn btn-danger"  href={`${API}/${todo.id}/delete`}>
                Delete Todo with ID = {todo.id}
            </a>
            <br /><br />

            <h3>Editing Items in an Array</h3>
            <input className="
                form-control
            " type="text" value={todo.description}
                onChange={(e) => setTodo({
                    ...todo, description: e.target.value
                })} />
            <br /><br />
            <a className="btn btn-warning "  href={`${API}/${todo.id}/description/${todo.description}`}>
                Update Description to {todo.description}
            </a>
            <br /><br />
            <input type="checkbox" checked={todo.completed}
                onChange={(e) => setTodo({
                    ...todo, completed: e.target.checked
                })} />
            <a className="btn btn-primary"  href={`${API}/${todo.id}/completed/${todo.completed}`}>
                Update Completed to {todo.completed.toString()}
            </a>
            <br /><br />
            <h4>
                Todo list
            </h4>
            <br />
            <button className="btn btn-primary"  onClick={createTodo} >
                Create Todo
            </button>
            <br /><br />
            <button onClick={() => deleteTodo(todo)}
                className="btn btn-danger">
                Delete Todo with ID = {todo.id}
            </button>
            <br />
            {errorMessage && (
                <div className="alert alert-danger mb-2 mt-2">
                    {errorMessage}
                </div>
            )}
            <br />
            <ul className="
                list-group list-group-flush
            ">
                {todos.map((todo: any) => (
                    <li className="
                        list-group-item
                    " key={todo.id}>
                        <input checked={todo.completed}
                            type="checkbox" readOnly />
                        {todo.title}
                        <p>{todo.description}</p>
                        <p>{todo.due}</p>
                        <div className="
                            d-flex gap-4
                        ">
                            <button className="btn btn-warning " onClick={() => fetchTodoById(todo.id)} >
                                Edit
                            </button>
                            <button className="btn btn-danger " onClick={() => removeTodo(todo)} >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default WorkingWithArrays;