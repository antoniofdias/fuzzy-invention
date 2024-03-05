import '@progress/kendo-theme-default/dist/all.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { KendoGrid } from './components/KendoGrid';
const router = createBrowserRouter([
  {
    path: '/',
    element: <KendoGrid />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
