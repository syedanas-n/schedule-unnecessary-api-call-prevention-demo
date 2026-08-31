import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  TimelineViews,
  Inject
} from '@syncfusion/ej2-react-schedule';
import './App.css';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const dataManager: DataManager = new DataManager({
  url: 'https://services.syncfusion.com/react/production/api/schedule',
  adaptor: new WebApiAdaptor(),
  crossDomain: true
});

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Schedule Unnecessary API Call Prevention Demo</h2>

      <ScheduleComponent
        height="650px"
        selectedDate={new Date(2026, 4, 10)}
        currentView="Month"
        eventSettings={{
          dataSource: dataManager
        }}
      >
        <Inject
          services={[
            Day,
            Week,
            WorkWeek,
            Month,
            TimelineViews
          ]}
        />
      </ScheduleComponent>
    </div>
  );
}

export default App;