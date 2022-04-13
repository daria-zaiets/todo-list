import scss from './TodoItem.module.scss';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel} from '@mui/material';
import {ITodo} from "../../types";
import cn from 'classnames';

interface IProps {
    todo: ITodo;
    changeStatus: () => void;
}

const TodoItem = ({todo, changeStatus}: IProps) => {

  return (
      <div className={cn(scss.todoItem, {
          [scss.todoItem_done]: todo.isDone
      })}>
          <div className={scss.todoItem__checkbox}>
              <FormControlLabel
                  control={
                  <Checkbox
                      checked={todo.isDone}
                      onChange={changeStatus}
                      color='default'
                  />}
                  label={todo.title}
                  className={cn({
                      [scss.todoItem__label_done]: todo.isDone
                  })}
              />
          </div>
          <div className={cn(scss.todoItem__action, {
              [scss.todoItem__action_done]: todo.isDone
          })}>
              <Button variant='text' size='small' color='inherit'>
                  <span className="material-icons-outlined"> edit_note </span>
              </Button>
              <Button variant='text' size='small' color='inherit'>
                  <span className="material-icons-outlined"> delete_forever </span>
              </Button>

          </div>
      </div>
  );
}

export default TodoItem;