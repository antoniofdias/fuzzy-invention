import '@progress/kendo-theme-default/dist/all.css';
import { DataProvider } from 'context';
import './App.css';
import { KendoGrid } from './components/KendoGrid';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <KendoGrid />
      </DataProvider>
    </div>
  );
}

export default App;
