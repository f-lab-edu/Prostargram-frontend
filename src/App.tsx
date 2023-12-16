import { RouterProvider } from 'react-router-dom';
import { lightTheme } from '@styles/theme.css';
import router from './routes';
import './global.css';

const App = () => {
  return (
    <div className={lightTheme}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
