
import './App.css';

import AllRoutes from './routes/AllRoutes';
import AppcontextProvider from './ContextProvider/AppcontextProvider';
function App() {
  return (
   <>

   <AppcontextProvider>
   <AllRoutes/>
   </AppcontextProvider>
    
   </>
  );
}

export default App;
