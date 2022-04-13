import './TodoItem.scss';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel} from '@mui/material';
import {ITodo} from "../../types";

interface IProps {
    todo: ITodo;
    changeStatus: () => void;
}

const TodoItem = ({todo, changeStatus}: IProps) => {

  return (
      <div className='todo-item'>
          <div className='todo-item__checkbox'>
              <FormControlLabel
                  control={
                  <Checkbox
                      checked={todo.isDone}
                      onChange={changeStatus}
                  />}
                  label={todo.title}
              />
          </div>
          <div className='todo-item__action'>
              <Button variant='text' size='small'>
                  <span className="material-icons-outlined"> edit_note </span>
              </Button>
              <Button variant='text' size='small'>
                  <span className="material-icons-outlined"> delete_forever </span>
              </Button>

          </div>
      </div>
  );
}

export default TodoItem;