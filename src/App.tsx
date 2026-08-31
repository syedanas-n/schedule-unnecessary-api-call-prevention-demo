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
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { useRef, useState } from 'react';
import './App.css';

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

const dataManager = new DataManager({
  url: 'https://services.syncfusion.com/react/production/api/schedule',
  adaptor: new WebApiAdaptor(),
  crossDomain: true
});

function App() {
  const scheduleRef = useRef<ScheduleComponent | null>(null);
  const currentColorField = useRef('Rooms');

  const [testResult, setTestResult] = useState(
    'Click a test button to run a scenario.'
  );

  const runTestUIOnlyChanges = () => {
    scheduleRef.current?.setProperties({
      cssClass: 'custom-schedule',
      width: '100%'
    });

    setTestResult(`
      ✅ TEST 1: UI Only Changes

      Properties Changed:
      • cssClass
      • width

      Expected:
      • Visual update only
      • No backend fetch required

    `);
  };

  const runTestLayoutChanges = () => {
    scheduleRef.current?.setProperties({
      startHour: '08:00',
      endHour: '18:00'
    });

    setTestResult(`
      ✅ TEST 2: Layout Changes

      Properties Changed:
      • startHour
      • endHour

      Expected:
      • Layout refresh
      • No backend fetch required

    `);
  };

  const runTestTemplateChange = () => {
    scheduleRef.current?.setProperties({
      eventSettings: {
        template:
          '<div class="e-template"><strong>${Subject}</strong></div>'
      }
    });

    setTestResult(`
      ✅ TEST 3: Template Change

      Properties Changed:
      • eventSettings.template

      Expected:
      • Appointment rerender
      • No backend fetch required

    `);
  };

  const runTestDataSourceChange = () => {
    // CRUD leads to data fetch

    setTestResult(`
      ✅ TEST 4: Data Refresh

      Action:
      • CRUD

      Expected:
      • Data refresh from server
      • Backend request is allowed

    `);
  };

  const runTestDateRangeDedup = () => {
    scheduleRef.current?.setProperties({
      startHour: '07:00'
    });

    scheduleRef.current?.setProperties({
      endHour: '19:00'
    });

    scheduleRef.current?.setProperties({
      cssClass: 'updated-schedule'
    });

    setTestResult(`
      ✅ TEST 5: Multiple Property Changes

      Properties Changed:
      • startHour
      • endHour
      • cssClass

      Expected:
      • Multiple UI updates
      • Same date range reused

    `);
  };

  const runTestResourceColorFieldChange = () => {
    currentColorField.current =
      currentColorField.current === 'Rooms'
        ? 'Owners'
        : 'Rooms';

    scheduleRef.current?.setProperties({
      eventSettings: {
        resourceColorField: currentColorField.current
      }
    });

    setTestResult(`
      ✅ TEST 6: ResourceColorField Change

      Property Changed:
      • eventSettings.resourceColorField

      Current Source:
      ${currentColorField.current}

      Expected:
      • Appointment colors change
      • Event data remains same
      • Only appointment rerender occurs
      • No backend request required

    `);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Schedule Unnecessary API Call Prevention Demo</h1>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '20px'
        }}
      >
        <button onClick={runTestUIOnlyChanges}>
          Test 1: UI Only Changes
        </button>

        <button onClick={runTestLayoutChanges}>
          Test 2: Layout Changes
        </button>

        <button onClick={runTestTemplateChange}>
          Test 3: Template Change
        </button>

        <button onClick={runTestDataSourceChange}>
          Test 4: Data Refresh (DO CRUD in the UI)
        </button>

        <button onClick={runTestDateRangeDedup}>
          Test 5: Multiple Property Changes
        </button>

        <button onClick={runTestResourceColorFieldChange}>
          Test 6: ResourceColorField
        </button>
      </div>

      <div
        style={{
          background: '#f5f5f5',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px'
        }}
      >
        <h3>Test Result</h3>

        <pre
          style={{
            whiteSpace: 'pre-wrap',
            margin: 0
          }}
        >
          {testResult}
        </pre>
      </div>

      <ScheduleComponent
        ref={scheduleRef}
        height="650px"
        width="800px"
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