// 'use client';

// import React, { useState, useMemo, useEffect } from 'react'
// import type { NextPage } from "next";
// import axios from "axios";
// import { Box } from "@mui/material";
// import Table from "../components/Table";
// import { columns } from './pages/colums';
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import { usePapaParse } from 'react-papaparse';
// import CSVReader from '../components/CSVReader';
// import { Dropdown } from '../components/Dropdown';

// import Map, {
//   Marker, Popup,
// } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css'

// export default function Home() {
//   const [decades, setDecades] = useState([]);
//   const [dataEntries, setDataEntries] = useState([]);
//   const [selectedDecade, setSelectedDecade] = React.useState('2030');
//   const [selectedDecadeEntries, setSelectedDecadeEntries] = useState([]);
//   const [tooltipInfo, setTooltipInfo] = useState(null);

//   const [users, setUsers] = useState<Api.Users.Data[] | undefined>(undefined);

//   const fetchUsers = async () => {
//     const { data } = await axios.get<Api.Users.FetchUsersResponse>(
//       "/api/users"
//     );

//     setUsers(data.data);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleDecadeChange = (event) => {
//     setSelectedDecade(event.target.value);
//     console.log(dataEntries);

//     const selectedEntries = dataEntries.filter(entry => entry[6] == event.target.value)
//     setSelectedDecadeEntries(selectedEntries)
//   };

//   const saveDecades = (data) => {
//     // console.log('---------------------------');
//     // console.log(data);
//     // console.log('---------------------------');
//     setDecades(Array.from(data))
//   };

//   const saveData = (data) => {
//     // Data takes time to load, needs to be optimised
//     const handler = setTimeout(() => {
//       setDataEntries(data)
//     }, 3000)
//     console.log('---------------------------');
//     console.log(data);
//     console.log('---------------------------');
//   };

//   const markers = useMemo(() => selectedDecadeEntries.map((location, index) => (
//     <Marker key={`marker-${index}`} longitude={Number(location[2])} latitude={Number(location[1])} anchor="bottom"
//       color={Number(location[4]) > 0.75 ? "red" : location[4] < 0.25 ? "green" : "orange"}
//       onClick={e => {
//         e.originalEvent.stopPropagation();
//         setTooltipInfo(location);
//       }} />
//   )
//   ), [selectedDecadeEntries]);

//   return (
//     <div>
//       <CSVReader onUpdateData={saveData} onUpdateDecades={saveDecades} />
//       <Dropdown
//         options={decades.map((elem) => { return { value: elem, label: elem } })}
//         label={'Select Decade'}
//         value={selectedDecade}
//         onChange={handleDecadeChange}
//       />
//       <Box padding={6}>{users && <Table data={users} columns={columns} />}</Box>
//       <Map
//         initialViewState={{
//           longitude: -122.4,
//           latitude: 37.8,
//           zoom: 3.5,
//           bearing: 0,
//           pitch: 0
//         }}
//         style={{ width: '100%', height: '80vh', borderRadius: 10 }}
//         // mapStyle="mapbox://styles/mapbox/navigation-day-v1"
//         mapStyle="mapbox://styles/mapbox/streets-v9"
//         mapboxAccessToken={'pk.eyJ1Ijoidm9tZXNhIiwiYSI6ImNsZ3dkeGs0djBmMzAzanBmdHZyODlqZXkifQ.1mOyV59ri2G0Hl0OCV2Wkg'}
//       >
//         {markers}

//         {tooltipInfo && (
//           <Popup
//             anchor="top"
//             longitude={Number(tooltipInfo[2])}
//             latitude={Number(tooltipInfo[1])}
//             onClose={() => setTooltipInfo(null)}
//           >
//             <p>
//               {tooltipInfo[0]}<br></br>
//               {tooltipInfo[3]}
//             </p>
//           </Popup>
//         )}
//       </Map>
//     </div>
//   );
// }
