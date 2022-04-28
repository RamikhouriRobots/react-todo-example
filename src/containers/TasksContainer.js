import React, { Component } from "react";
import {
  updateById,
  deleteById,
  addNew,
  getAll,
} from "../services/apiService";
import "../css/tasks.css"


class TasksContainer extends Component {
  state = { tasks: [], currentTask: "" };
  async componentDidMount() {
    try {
      const { data } = await getAll('tasks');
      if (data)
      this.setState({ tasks: data });
    } catch (error) {
      console.error();
    }
  }

  handleChange = ({ currentTarget: input }) => {
    this.setState({ currentTask: input.value });
    console.log(input.value)
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const originalTasks = this.state.tasks;
    try {
      const { data } = await addNew('task',{ content: this.state.currentTask , completed: false});
      const tasks = originalTasks;
      tasks.push(data);
      this.setState({ tasks, currentTask: "" });
    } catch (error) {
      console.error(error);
    }
  };

  handleUpdate = async (e,currentTask) => {
    const originalTasks = this.state.tasks;
    try {
      const tasks = [...originalTasks];
      const index = tasks.findIndex((task) => task._id === currentTask);
      tasks[index] = { ...tasks[index] };
      tasks[index].completed = e.target.checked;
      this.setState({ tasks });
      await updateById('task/edit',currentTask, {content:tasks[index].content, completed: e.target.checked });
    } catch (error) {
      this.setState({ tasks: originalTasks });
      console.error(error);
    }
  };

  handleDelete = async (currentTask) => {
    const originalTasks = this.state.tasks;
    try {
      const tasks = originalTasks.filter((task) => task._id !== currentTask);
      this.setState({ tasks });
      await deleteById('task/remove',currentTask);
    } catch (error) {
      this.setState({ tasks: originalTasks });
      console.error(error);
    }
  };

  render(){
    const {tasks} = this.state;
    return (
      <div className="container">
        <div className='heading'>Create your own task</div>
        <form onSubmit={this.handleSubmit} className="flex-column"
        style={{margin: "15px 0"}}>
         <input type="text"
         value= {this.state.currentTask}
         required={true}
         onChange={this.handleChange}
         placeholder="Add new TO - DO"
         />
         <input type="submit"
         color="primary"
         />
         <div>
           {
            tasks.map((task) =>(
               <div key={task._id} className="flex task_container">
                 <input type='checkbox' defaultChecked={task.completed}
                 onClick={(e)=> this.handleUpdate(e, task._id)}
                 color="primary"
                 />
                 <div className={task.completed ?"task line_through" : "task"}>
                   {task.content}
                 </div>
                 <button onClick={()=> this.handleDelete(task._id)}
                 className="delete-button">
                   delete
                 </button>
               </div>
             ))
           }
         </div>
        </form>
      </div>)
  }

}

export default TasksContainer;
