import React, { useState, useMemo, useEffect } from 'react'
// import { Alert, div, Button, Typography } from "@mui/material";
import type { NextPage } from "next";
import axios from "axios";
import DataTable from '../components/DataTable';
import { columns } from './colums';
import { useQuery } from "@tanstack/react-query";
import CSVReader from '../components/CSVReader';
import ReadRemoteFile from '../components/RemoteCSVReader';
import { Dropdown } from '../components/Dropdown';

import Map, {
  Marker, Popup,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");

  const [decades, setDecades] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [dataEntries, setDataEntries] = useState([]);
  const [selectedDecade, setSelectedDecade] = React.useState('2030');
  const [selectedDecadeEntries, setSelectedDecadeEntries] = useState([]);
  const [selectedDecadeEntriesPaginate, setSelectedDecadeEntriesPaginate] = useState([]);
  const [tooltipInfo, setTooltipInfo] = useState(null);

  const [users, setUsers] = useState<Api.Users.Data[] | undefined>(undefined);

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const handleDecadeChange = (event) => {
    setIsFetching(true)
    setSelectedDecade(event.target.value);
    // console.log(dataEntries);

    const selectedEntries = dataEntries.filter(entry => entry['year'] == event.target.value)
    // console.log('---------------------------');
    // console.log(selectedEntries);
    // console.log('---------------------------');
    setSelectedDecadeEntries(selectedEntries)
    setSelectedDecadeEntriesPaginate(paginate(selectedEntries))
    setIsFetching(false)
  };

  const saveDecades = (data) => {
    setDecades(Array.from(data))
  };

  const saveData = (data) => {
    // Data takes time to load, needs to be optimised
    const handler = setTimeout(() => {
      setDataEntries(data)
    }, 3000)
  };

  const markers = useMemo(() => selectedDecadeEntries.map((location, index) => (
    <Marker key={`marker-${index}`} longitude={Number(location['long'])} latitude={Number(location['lat'])} anchor="bottom"
      color={Number(location['risk_rating']) > 0.75 ? "red" : location['risk_rating'] < 0.25 ? "green" : "orange"}
      onClick={e => {
        e.originalEvent.stopPropagation();
        setTooltipInfo(location);
      }} />
  )
  ), [selectedDecadeEntries]);

  const onClickRow = (cell: any, row: any) => {
    console.log({ cell, row });
  };

  const paginate = (items, page = 1, perPage = 10) => {
    const offset = perPage * (page - 1);
    const totalPages = Math.ceil(items.length / perPage);
    const paginatedItems = items.slice(offset, perPage * page);
  
    return {
        previousPage: page - 1 ? page - 1 : null,
        nextPage: (totalPages > page) ? page + 1 : null,
        total: items.length,
        totalPages: totalPages,
        items: paginatedItems
    };
};

  const Header = (
    <div display="flex" justifyContent="space-between">
      <span variant="h4" alignItems="center">
        Climate Risk Data
      </span>
    </div>
  );

  return (
    <div padding={6}>
      <ReadRemoteFile onUpdateData={saveData} onUpdateDecades={saveDecades} />
      <CSVReader onUpdateData={saveData} onUpdateDecades={saveDecades} />
      <Dropdown
        options={decades.map((elem) => { return { value: elem, label: elem } })}
        label={'Select Decade'}
        value={selectedDecade}
        onChange={handleDecadeChange}
      />
      {/* <div padding={6}>{users && <Table data={users} columns={columns} />}</div> */}
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 3.5,
          bearing: 0,
          pitch: 0
        }}
        style={{ width: '100%', height: '80vh', borderRadius: 10 }}
        // mapStyle="mapbox://styles/mapbox/navigation-day-v1"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={'pk.eyJ1Ijoidm9tZXNhIiwiYSI6ImNsZ3dkeGs0djBmMzAzanBmdHZyODlqZXkifQ.1mOyV59ri2G0Hl0OCV2Wkg'}
      >
        {markers}

        {tooltipInfo && (
          <Popup
            anchor="top"
            longitude={Number(tooltipInfo['long'])}
            latitude={Number(tooltipInfo['lat'])}
            onClose={() => setTooltipInfo(null)}
          >
            <p>
              {tooltipInfo['asset_name']}<br></br>
              {tooltipInfo['business_category']}
            </p>
          </Popup>
        )}
      </Map>

      {/* {isError && <Alert severity="error">{error?.message}</Alert>} */}
      {selectedDecadeEntries && (
        <DataTable
          data={selectedDecadeEntries}
          columns={columns}
          isFetching={false}
          headerComponent={Header}
          onClickRow={onClickRow}
          // pageCount={selectedDecadeEntriesPaginate.totalPages}
          // page={setCurrentPage}
          search={setSearch}
          searchLabel="Search by name"
        />
      )}
    </div>
  );
};

export default Home;