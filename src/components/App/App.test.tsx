import { render, screen } from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import {createReduxStore} from "../../stores";

test('renders start elements', () => {
  render(
      <Provider store={createReduxStore()}>
        <App />
      </Provider>
  );
  const headerElement = screen.getByText(/todo list/i);
  expect(headerElement).toBeInTheDocument();
});
