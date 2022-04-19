import {FILTER} from "../../types";
import TodoFilterItem from "./TodoFilterItem/TodoFilterItem";
import scss from "./TodoFilterGroup.module.scss";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setFilter} from "../../stores/reducers/TodoSlice";

const filtersTitle = {
  [FILTER.ALL]: 'All',
  [FILTER.PENDING]: 'Pending',
  [FILTER.DONE]: 'Done',
};

const TodoFilterGroup = () => {
  const dispatch = useAppDispatch();

  const filter = useAppSelector(state => state.todoReducer.filter)
  const filterItems = Object.values(FILTER);

  const setActive = (filter: FILTER) => () => {
    dispatch(setFilter(filter));
  };

  return (
      <div className={scss.filterGroup} data-testid="filter-group">
        {filterItems.map((filterItem: FILTER) => (
            <TodoFilterItem
                key={filterItem}
                title={filtersTitle[filterItem]}
                isChecked={filter===filterItem}
                setActive={setActive(filterItem)}
            />
        ))}
      </div>
  );
};

export default TodoFilterGroup;