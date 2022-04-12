import './TodoItem.scss';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel} from '@mui/material';

const TodoItem = ({title}: {title: string}) => {
  return (
      <div className='todo-item'>
          <div className='todo-item__checkbox'>
              <FormControlLabel
                  control={<Checkbox />}
                  label={title}
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