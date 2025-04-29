import { useState } from 'react';
import { SortableTable } from './components/SortableTable';
import './App.css';

function App() {
  const [tableData] = useState([
    { id: 2, firstName: 'Annette', lastName: 'Kling', jobTitle: 'Future Marketing Agent', email: 'Cale_Runte@yahoo.com' },
    { id: 4, firstName: 'Axel', lastName: 'Grant', jobTitle: 'Regional Functionality Technician', email: 'Kevin_Guigonvski@hotmail.com' },
    { id: 7, firstName: 'Brooks', lastName: 'Breitenberg', jobTitle: 'Internal Assurance Analyst', email: 'Willie43@gmail.com' },
    { id: 3, firstName: 'Emmitt', lastName: 'Schiller', jobTitle: 'Legacy Tactics Assistant', email: 'Meda_Romaguera2@hotmail.com' },
    { id: 5, firstName: 'Jadden', lastName: 'Denesik', jobTitle: 'Lead Implementation Planner', email: 'Annetta_Hettinger43@yahoo.com' },
    { id: 1, firstName: 'Javier', lastName: 'Jenkins', jobTitle: 'Investor Integration Liaison', email: 'Geo_McCutrough55@hotmail.com' },
    { id: 8, firstName: 'Jayce', lastName: 'Torphy', jobTitle: 'National Research Consultant', email: 'LoyPolitch90@yahoo.com' },
    { id: 9, firstName: 'Susanna', lastName: 'Kuhn', jobTitle: 'Forward Accountability Executive', email: 'Assunta_Klein14@hotmail.com' },
    { id: 6, firstName: 'Webster', lastName: 'Okamera', jobTitle: 'Direct Identity Agent', email: 'Hayhe_Jakubowski66@yahoo.com' },
    { id: 10, firstName: 'Yessenia', lastName: 'Rogahn', jobTitle: 'Legacy Implementation Supervisor', email: 'Jadeekl0@yahoo.com' }
  ]);

  return (
    <div className="app-container">
      <h1>Таблица</h1>
      <SortableTable data={tableData} />
    </div>
  );
}

export default App;