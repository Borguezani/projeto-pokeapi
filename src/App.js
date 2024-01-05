

import './App.css';
import { ThemeProvider } from './contexts/theme-context';
import { AppRoutes } from './router';


function App() {
  return (
    <ThemeProvider>
      <AppRoutes></AppRoutes>
    </ThemeProvider>
     
  );
}

export default App;
