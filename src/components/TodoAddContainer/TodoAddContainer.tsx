import {KeyboardEvent, ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import './TodoAddContainer.scss';
import {useAppDispatch} from "../../hooks/redux";
import {addTodo} from "../../stores/reducers/TodoSlice";

const TodoAddContainer = () => {
    const dispatch = useAppDispatch();
    const [todoText, setTodoText] = useState('');

    const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => {
        setTodoText(event.target.value);
    };

    const addItem = () => {
        setTodoText('');
        dispatch(addTodo(todoText));
    };

    const enterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addItem();
    }

  return (
      <div className="add-container">
          <TextField
              className='app-body__todo-input'
              label='add item'
              variant='outlined'
              size='small'
              value={todoText}
              onChange={onChangeTodoText}
              onKeyUp={enterHandler}
          />
          <Button className='app-body__todo-add-btn' variant="contained" size='small' onClick={addItem}> Add </Button>
      </div>
  );
}

export default TodoAddContainer;