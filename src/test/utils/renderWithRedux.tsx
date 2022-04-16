import {ReactNode} from "react";
import {ITodoSate} from "../../types";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import {createReduxStore} from "../../stores";

export const renderWithRedux = (component: ReactNode, initialState: ITodoSate) => {
    const store = createReduxStore({todoReducer: initialState});

    return render(
        <Provider store={store}>
            {component}
        </Provider>
    );
};