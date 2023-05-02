import React, { useState, useMemo, useEffect } from 'react'
// import { Alert, div, Button, Typography } from "@mui/material";
import type { NextPage } from "next";
import axios from "axios";
import DataTable from '../components/DataTable';
import { columns } from './colums';
import { useQuery } from "@tanstack/react-query";
import ReadRemoteFile from '../components/RemoteCSVReader';
import { Dropdown } from '../components/Dropdown';
import Chart from '../components/Chart';
import { Loader } from '../components/Loader';

import Map, {
  Marker, Popup,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Visualize Risk Over Time',
    },
  },
}

interface dataEntry {
  lat: string;
  long: string;
  risk_rating: number;
  asset_name: string;
  business_category: string;
}

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");

  const [decades, setDecades] = useState<any>();
  const [isFetching, setIsFetching] = useState(false);
  const [dataEntries, setDataEntries] = useState([]);
  const [selectedDecade, setSelectedDecade] = React.useState('2030');
  const [selectedDecadeEntries, setSelectedDecadeEntries] = useState([]);
  // const [selectedDecadeEntriesPaginate, setSelectedDecadeEntriesPaginate] = useState([]);
  const [tooltipInfo, setTooltipInfo] = useState<dataEntry | null>();

  const handleDecadeChange = (event: { target: any }) => {
    setSelectedDecadeValue(event.target.value)
  };

  const setSelectedDecadeValue = (value: string) => {
    // alert(value )
    const selectedEntries = dataEntries.filter(entry => entry['year'] === value)

    setSelectedDecade(value);
    setSelectedDecadeEntries(selectedEntries)
    // setSelectedDecadeEntriesPaginate(paginate(selectedEntries))
  };

  const saveDecades = (data: any) => {
    const orderedDecadesArr = Array.from(data).sort()
    setDecades(orderedDecadesArr)
    // console.log('selectedDecadeEntries ---> ', selectedDecadeEntries);
    setIsFetching(false)
  };

  const saveData = (data: any) => {
    setDataEntries(data)
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

  const chartData = useMemo(() => {
    if (tooltipInfo) {
      const riskRatingValues = selectedDecadeEntries.map((entry: dataEntry) => {
        if (entry.lat === tooltipInfo.lat && entry.long === tooltipInfo.long) {
          return entry.risk_rating
        }
        return null
      }).filter(value => value !== null)
      console.log(riskRatingValues);

      return {
        labels: decades,
        datasets: [
          {
            label: 'Dataset',
            data: riskRatingValues,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 164, 235, 0.5)',
          },
        ],
      }
    }
    return {
      labels: decades,
      datasets: [
        {
          label: 'Dataset',
          data: [],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 164, 235, 0.5)',
        },
      ],
    }
  }, [decades, selectedDecadeEntries, tooltipInfo]);

  const onClickRow = (cell: any, row: any) => {
    console.log({ cell, row });
  };

  const paginate = (items: any, page = 1, perPage = 10) => {
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
    <div className="flex space-between">
      <h4>
        Climate Risk Data
      </h4>
    </div>
  );

  return (
    <>
      {isFetching ? <Loader /> :
        <div className="w-full">
          <h1 className="text-3xl font-bold mx-2 mb-4">
            Climate Risk Rating Dataset
          </h1>
          <div className="md:flex md:items-center mx-2 mb-6">
            <div className="md:flex md:items-center">
              <ReadRemoteFile onUpdateData={saveData} onUpdateDecades={saveDecades} />
            </div>
            <Dropdown
              options={decades?.map((elem: any) => { return { value: elem, label: elem } })}
              label={'Select Decade'}
              value={selectedDecade}
              onChange={handleDecadeChange}
            />
          </div>
          <div className="grid mx-2 md:grid-cols-2 gap-4 sm:grid-cols-1">
            <div className="w-full">
              <Map
                initialViewState={{
                  longitude: -80.38297,
                  latitude: 42.8334,
                  zoom: 1.5,
                  bearing: 0,
                  pitch: 0
                }}
                // style={{ width: '100%', borderRadius: 10 }}
                // mapStyle="mapbox://styles/mapbox/navigation-day-v1"
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
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
            </div>

            <div className="w-full">
              <Chart data={chartData} options={options} />
            </div>
          </div>


          {/* {isError && <Alert severity="error">{error?.message}</Alert>} */}
          {selectedDecadeEntries && (
            <DataTable
              data={selectedDecadeEntries}
              columns={columns}
              // isFetching={false}
              // headerComponent={Header}
              // onClickRow={onClickRow}
              // pageCount={selectedDecadeEntriesPaginate.totalPages}
              // page={setCurrentPage}
              // search={setSearch}
              // searchLabel="Search by name"
            />
          )}
        </div>
      }
    </>
  );
};

export default Home;