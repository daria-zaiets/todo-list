import scss from "./TodoFolterItem.module.scss"
import cn from "classnames";

interface IProps {
    title: string;
    isChecked?: boolean;
    setActive: () => void;
}

const TodoFilterItem = ({title, setActive, isChecked = false}: IProps) => {
    return (
        <div
            className={cn(scss.filterItem, {
            [scss.filterItem_active]: isChecked
            })}
             onClick={setActive}
            data-testid="filter-item"
        >
            {title}
        </div>
    );
};

export default TodoFilterItem;