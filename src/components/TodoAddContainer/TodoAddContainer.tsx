import {KeyboardEvent, ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import scss from './TodoAddContainer.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {addTodo, isTodoInList} from "../../stores/reducers/TodoSlice";

// const errorText = "field can't be empty";
// const isTodoInListText = "duplicate title"

enum ERROR_TEXT {
    EMPTY_FILED = "field can't be empty",
    DUPLICATE_TITLE = "duplicate title"
}

const TodoAddContainer = () => {
    const dispatch = useAppDispatch();
    const isDuplicateTitle = useAppSelector(isTodoInList);

    const [todoText, setTodoText] = useState('');
    const [errorText, setErrorText] = useState< ERROR_TEXT | null>(null);

    const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => {
        errorText && setErrorText(null);
        setTodoText(event.target.value);
    };

    const addItem = () => {
        if(!todoText.trim()) {
            setErrorText(ERROR_TEXT.EMPTY_FILED);
            return;
        }
        if(isDuplicateTitle(todoText)) {
            setErrorText(ERROR_TEXT.DUPLICATE_TITLE);
            return;
        }
        dispatch(addTodo(todoText));
        setTodoText('');
    };

    const enterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addItem();
    }

    // if(!isEmptyFiled && !isTodoInList) setTodoText('');

  return (
      <div className={scss.addContainer}>
          <TextField
              label='add item'
              variant='outlined'
              size='small'
              value={todoText}
              onChange={onChangeTodoText}
              onKeyUp={enterHandler}
              error={!!errorText}
              helperText={errorText}
          />
          <div className={scss.addButtonContainer}>
              <Button variant="contained" size='medium' onClick={addItem}> Add </Button>
          </div>
      </div>
  );
}

export default TodoAddContainer;