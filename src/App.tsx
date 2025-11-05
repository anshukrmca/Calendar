
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarPage from './pages/CalendarPage';
import UIExamplesPage from './pages/UIExamplesPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/ui-examples" element={<UIExamplesPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
