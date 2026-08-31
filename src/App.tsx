import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  TimelineViews,
  Inject,
  ResourcesDirective,
  ResourceDirective
} from '@syncfusion/ej2-react-schedule';
import './App.css';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { useState, useRef } from 'react';

const roomData = [
  { Id: 1, Text: 'Room 1', Color: '#cb6bb2' },
  { Id: 2, Text: 'Room 2', Color: '#56ca85' },
  { Id: 3, Text: 'Room 3', Color: '#df5286' }
];

const ownerData = [
  { Id: 1, RoomId: 1, Text: 'Owner 1', Color: '#ffaa00' },
  { Id: 2, RoomId: 2, Text: 'Owner 2', Color: '#00aaff' },
  { Id: 3, RoomId: 3, Text: 'Owner 3', Color: '#66cc66' },
  { Id: 4, RoomId: 1, Text: 'Owner 4', Color: '#ff6666' },
  { Id: 5, RoomId: 2, Text: 'Owner 5', Color: '#9966ff' },
  { Id: 6, RoomId: 3, Text: 'Owner 6', Color: '#33cccc' }
];

const dataManager: DataManager = new DataManager({
  url: 'https://services.syncfusion.com/react/production/api/schedule',
  adaptor: new WebApiAdaptor(),
  crossDomain: true
});


function App() {
  const scheduleRef = useRef<ScheduleComponent | null>(null);
  const currentColorField = useRef('Rooms');
  const [colorSource, setColorSource] = useState('Rooms');
  return (
    <div style={{ padding: '20px' }}>
      <h2>Schedule Unnecessary API Call Prevention Demo</h2>
      <button
        onClick={() => {
          currentColorField.current =
            currentColorField.current === 'Rooms'
              ? 'Owners'
              : 'Rooms';

          scheduleRef.current?.setProperties({
            eventSettings: {
              resourceColorField: currentColorField.current
            }
          });
        }}
      >
      Toggle Resource Color Field
      </button>
      <ScheduleComponent
        ref={scheduleRef}
        height="650px"
        selectedDate={new Date(2026, 4, 10)}
        currentView="TimelineDay"
        group={{
          resources: ['Rooms', 'Owners']
        }}
        eventSettings={{
          dataSource: dataManager,
          resourceColorField: 'Rooms'
        }}
      >
        <ResourcesDirective>
          <ResourceDirective
            field="RoomId"
            title="Room"
            name="Rooms"
            dataSource={roomData}
            textField="Text"
            idField="Id"
            colorField="Color"
          />
          <ResourceDirective
            field="ResourceId"
            title="Owner"
            name="Owners"
            dataSource={ownerData}
            textField="Text"
            idField="Id"
            groupIDField="RoomId"
            colorField="Color"
          />
        </ResourcesDirective>
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