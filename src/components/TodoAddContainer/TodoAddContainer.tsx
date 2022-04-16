import {KeyboardEvent, ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import scss from './TodoAddContainer.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {addTodo, isTodoInList} from "../../stores/reducers/TodoSlice";

export enum ERROR_TEXT {
    EMPTY_FILED = "field can't be empty",
    DUPLICATE_TITLE = "duplicate title"
}

const TodoAddContainer = () => {
    const dispatch = useAppDispatch();
    const isDuplicateTitle = useAppSelector(isTodoInList);

    const [todoTitle, setTodoTitle] = useState('');
    const [errorText, setErrorText] = useState< ERROR_TEXT | null>(null);

    const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => {
        errorText && setErrorText(null);
        setTodoTitle(event.target.value);
    };

    const addItem = () => {
        const todoText = todoTitle.trim();
        if(!todoText) {
            setErrorText(ERROR_TEXT.EMPTY_FILED);
            return;
        }
        if(isDuplicateTitle(todoText)) {
            setErrorText(ERROR_TEXT.DUPLICATE_TITLE);
            return;
        }
        dispatch(addTodo(todoText));
        setTodoTitle('');
    };

    const enterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addItem();
    }

  return (
      <div className={scss.addContainer}>
          <TextField
              label='Add item'
              variant='outlined'
              size='small'
              value={todoTitle}
              onChange={onChangeTodoText}
              onKeyUp={enterHandler}
              error={!!errorText}
              helperText={errorText}
              inputProps={{"data-testid": "add-item-field"}}

          />
          <div className={scss.addButtonContainer}>
              <Button
                  variant="contained"
                  size='medium'
                  onClick={addItem}
                  data-testid='add-item-button'
                  disabled={!todoTitle.trim()}
              >
                  Add
              </Button>
          </div>
      </div>
  );
}

export default TodoAddContainer;