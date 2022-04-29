import { updateById, deleteById, addNew, getAll } from "../services/apiService";
import "../css/tasks.css";
import store from "../services/store";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function TasksContainer() {
  const [tasks, setTasks] = useState();
  const [currentTask, setCurrentTask] = useState('');
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setCurrentTask(input.value);
    console.log(currentTask);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const originalTasks = tasks;
    try {
      const { data } = await addNew("task", {
        content: currentTask,
        completed: false,
      });
      const processTasks = originalTasks;
      processTasks.push(data);
      setTasks([...tasks], data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e, instanceTask) => {
    const originalTasks = tasks;
    try {
      const processTasks = [...originalTasks];
      const index = processTasks.findIndex((task) => task._id === instanceTask);
      processTasks[index] = { ...processTasks[index] };
      processTasks[index].completed = e.target.checked;
      setTasks(processTasks);

      await updateById("task/edit", instanceTask, {
        content: processTasks[index].content,
        completed: e.target.checked,
      });
    } catch (error) {
      setTasks(originalTasks);
      console.error(error);
    }
  };

  const handleDelete = async (instanceTask) => {
    const originalTasks = tasks;
    try {
      const processTasks = originalTasks.filter(
        (task) => task._id !== instanceTask
      );
      setTasks(processTasks);
      await deleteById("task/remove", instanceTask);
    } catch (error) {
      setTasks(originalTasks);
      console.error(error);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.clear();
       const userAction = {type:'ADD_USER',user: null }
       store.dispatch(userAction);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const getTasks = async () => {
    const currentUser = localStorage.getItem("user");
    if (currentUser) {
      const { data } = await getAll("tasks");
      if (data) {
        const { name } = store.getState().user || JSON.parse(currentUser);
        setTasks(data);
        setUser(name);
      }
    } else navigate("/");
  };
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <span>Welcome {user}</span>
      <button style={{ float: "right" }} onClick={() => handleLogout()}>
        Logout
      </button>
      <div className="container">
        <div className="heading">Create your own task</div>
        <form
          onSubmit={handleSubmit}
          className="flex-column"
          style={{ margin: "15px 0" }}
        >
          <input
            type="text"
            value={currentTask}
            required={true}
            onChange={handleChange}
            placeholder="Add new TO - DO"
          />
          <input type="submit" color="primary" />
          <div>
            {tasks
              ? tasks.map((task) => (
                  <div key={task._id} className="flex task_container">
                    <input
                      type="checkbox"
                      defaultChecked={task.completed}
                      onClick={(e) => handleUpdate(e, task._id)}
                      color="primary"
                    />
                    <div
                      className={task.completed ? "task line_through" : "task"}
                    >
                      {task.content}
                    </div>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="delete-button"
                    >
                      delete
                    </button>
                  </div>
                ))
              : ""}
          </div>
        </form>
      </div>
    </div>
  );
}

export default TasksContainer;
