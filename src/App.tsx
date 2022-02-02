// import arSA from "date-fns/locale/ar-SA";
import { Box, Typography } from "@mui/material"
import { cs } from 'date-fns/locale'
import React, { useEffect, useState } from "react"
import { Scheduler } from "./lib/Scheduler"
import { EVENTS } from "./model/events"

const App = () => {
	// const [ events, setEvents ] = useState(EVENTS)
	const [date, setDate] = useState(new Date())

	useEffect(() => {
		console.log(date)
	}, [date])

	return (
		<Scheduler
			events={EVENTS}
			disableEditor
			disableViewer
			// onDateChange={date => dispatch(setDate(date))}
			// onViewChange={view => dispatch(setView(view))}
			// selectedDate={selectedDate}
			// view={selectedView}
			locale={cs}
			month={{
				weekDays: [ 0, 1, 2, 3, 4, 5, 6 ],
				weekStartOn: 1,
				startHour: 7,
				endHour: 15,
			}}
			week={{
				startHour: 6,
				endHour: 18,
				step: 60,
				weekDays: [ 0, 1, 2, 3, 4, 5, 6 ],
				weekStartOn: 1
			}}
			renderNavigation={({viewSelector, dateSelector, todayButton}) => (
				<>
					<Box sx={{display: 'flex', flexDirection: 'row'}}>
						<Typography>Test</Typography>
						{dateSelector}
						{todayButton}
					</Box>
					<Box sx={{display: 'flex', flexDirection: 'row'}}>
						{viewSelector}
					</Box>
				</>
			)}

			// dialogMaxWidth="sm"
			// loading
			// view="month"
			// events={EVENTS}
			// locale={cs}
			// selectedDate={date}
			// onDateChange={setDate}
			// sx={{
			// 	height: '100%',
			// }}
			// week={{
			// 	weekDays: [ 0, 1, 2, 3, 4, 5, 6 ],
			// 	weekStartOn: 1,
			// 	startHour: 8,
			// 	endHour: 15,
			// 	step: 30,
			// 	// cellRenderer: () => {
			// 	//   return <>week</>;
			// 	// },
			// }}
			// month={{
			// 	weekDays: [ 0, 1, 2, 3, 4, 5, 6 ],
			// 	weekStartOn: 1,
			// 	startHour: 7,
			// 	endHour: 15,
			// }}
			// day={{
			// 	startHour: 6,
			// 	endHour: 16,
			// 	step: 30,
			// }}
			// localizationTexts={{
			// 	today: 'Dnes',
			// 	month: 'Měsíc',
			// 	week: "Týden",
			// 	day: "Den",
			// 	more: "Další..."
			// }}
			// // disableDrag
			// disableViewer
			// disableEditor
			// onCellClick={(cellStart, cellEnd) => {
			// 	console.log(cellStart, cellEnd)
			// }}
			// onEventClick={event => console.log(event)}
			// onEventDrop={async (droppedOn, updatedEvent, originalEvent) => console.log(droppedOn, updatedEvent,
			// originalEvent)} day={{ startHour: 8, endHour: 18, step: 20, }} remoteEvents={async (query) => { await
			// new Promise((res, rej) => { setTimeout(() => { // setEvents(EVENTS); res(""); }, 1000);
			//   });
			//   // return null;
			//   // return EVENTS;
			// }}
			// fields={[
			//   {
			//     name: "description",
			//     type: "input",
			//     config: { label: "Description", multiline: true, rows: 4 },
			//   },
			//   {
			//     name: "admin_id",
			//     type: "select",
			//     config: { label: "Assignee", required: true, multiple: "chips" },
			//     // default: [1, 2],
			//     options: [
			//       // {
			//       //   id: 1,
			//       //   text: "One",
			//       //   value: 1,
			//       // },
			//       {
			//         id: 2,
			//         text: "Two",
			//         value: 2,
			//       },
			//       {
			//         id: 3,
			//         text: "Three",
			//         value: 3,
			//       },
			//       {
			//         id: 4,
			//         text: "Four",
			//         value: 4,
			//       },
			//     ],
			//   },
			// ]}
			// onConfirm={async (event, action) => {
			//   console.log(action);
			//   return new Promise((res, rej) => {
			//     setTimeout(() => {
			//       res({
			//         ...event,
			//         event_id: event.event_id || Math.random(),
			//         // title: "From Custom",
			//         // start: new Date(new Date().setHours(11)),
			//         // end: new Date(new Date().setHours(18)),
			//       });
			//     }, 1000);
			//   });
			// }}
			// onDelete={async (id) => {
			//   await new Promise((res, rej) => {
			//     setTimeout(() => {
			//       setEvents((prev) => {
			//         return prev.filter((p) => p.event_id !== id);
			//       });
			//       res("");
			//     }, 1000);
			//   });
			// }}
			// customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
			// viewerExtraComponent={(fields, e) => {
			//   return (
			//     <div>
			//       {Array.from("a".repeat(50)).map((a, i) => (
			//         <div key={i}>Extra</div>
			//       ))}
			//     </div>
			//   );
			//   // console.log(fields, e);
			//   // return (
			//   //   <div>
			//   //     {fields.map((a, i) => (
			//   //       <div key={i}>{e.description}</div>
			//   //     ))}
			//   //   </div>
			//   // );
			// }}
			// viewerTitleComponent={(event) => <>{event.title}</>}
			// direction="rtl"
			// locale={arSA}
			// onEventDrop={async (time, updated) => {
			//   return new Promise((res) => {
			//     setTimeout(() => {
			//       setEvents((prev: any) => {
			//         return prev.map((e) =>
			//           e.event_id === updated.event_id ? updated : e
			//         );
			//       });
			//       res();
			//     }, 1000);
			//   });
			// }}
		/>
	)
}

export { App }
