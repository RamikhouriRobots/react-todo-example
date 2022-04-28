import React from 'react'

class AddTodo extends React.Component {
  constructor(props) {
    super(props)

    this.defaultState = {
      text: '',
      priority: 2
    }

    this.state = this.defaultState;
  }

  onChangeHandler = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.type === 'checkbox' ? target.checked : target.value
    });
  }

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.onAddTodoHandler(this.state);
    this.setState(this.defaultState);
  }

  render() {
    const { text, priority} = this.state;
    return (
      <form onSubmit={this.onSubmitHandler}>
        <input name="text"
               value={text}
               onChange={this.onChangeHandler} />
        <select name="priority"
                value={priority}
                onChange={this.onChangeHandler}>
          <option value={1}>High (1)</option>
          <option value={2}>Mid (2)</option>
          <option value={3}>Low (3)</option>
        </select>
        <button>Add todo</button>
      </form>
    )
  }
}

export default AddTodo