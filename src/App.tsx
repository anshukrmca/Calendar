
import { Provider } from 'react-redux';
import { store } from './store';
import CalendarPage from './pages/CalendarPage';

function App() {
  return (
    <Provider store={store}>
      <CalendarPage />
    </Provider>
  );
}

export default App;
