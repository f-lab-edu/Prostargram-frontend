import { RouterProvider } from 'react-router-dom';
import { lightTheme } from '@styles/theme.css';
import router from './routes';
import * as Styles from './App.css';
import './global.css';

const App = () => {
  return (
    <div className={`${Styles.container} ${lightTheme} `}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
