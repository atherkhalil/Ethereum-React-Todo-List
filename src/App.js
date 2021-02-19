import React from "react";
import Web3 from "web3";
import "./App.css";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "./config";
import TodoList from "./TodoList";

const App = () => {
  const [account, setAccount] = React.useState("");
  const [taskCount, setTaskCount] = React.useState(0);
  const [tasks, setTasks] = React.useState([]);
  const [todosList, setTodosList] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    setTasks([]);
    const web3 = new Web3("http://localhost:9545");
    //Load Account
    setTimeout(async () => {
      const ac = await web3.eth.getAccounts();
      setAccount(ac[0]);
    }, 100);
    //Fetch Todo List
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    setTodosList(todoList);
    const taskCount = await todoList.methods.taskCount().call();
    setTaskCount(taskCount);
    let tasks = [];
    for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call();
      tasks.push(task);
    }
    setTasks(tasks.reverse());

    setLoading(false);
  };

  const createTask = async (content) => {
    setLoading(true);
    todosList.methods
      .createTask(content)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        console.log(content);
        loadBlockchainData();
      });
  };

  const toggleCompleted = (taskId) => {
    setLoading(true);
    todosList.methods
      .toggleCompleted(taskId)
      .send({ from: account })
      .once("receipt", (receipt) => {
        loadBlockchainData();
      });
  };

  return (
    <div>
      <nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow'>
        <a className='navbar-brand col-sm-3 col-md-2 mr-0' href='#'>
          Ethereum Powered Todo List Application
        </a>
        <ul className='navbar-nav px-3'>
          <li className='nav-item text-nowrap d-none d-sm-none d-sm-block'>
            <small>
              <a className='nav-link' href='#'>
                <span id='account'></span>
              </a>
            </small>
          </li>
        </ul>
      </nav>
      <div className='container-fluid'>
        <div className='row'>
          <main role='main' className='col-lg-12 d-flex justify-content-center'>
            {loading ? (
              <div id='loader' className='text-center'>
                <p className='text-center'>Loading...</p>
              </div>
            ) : (
              <TodoList
                tasks={tasks}
                createTask={createTask}
                toggleCompleted={toggleCompleted}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
