import React from 'react';

import { usePapaParse } from 'react-papaparse';

export default function ReadRemoteFile(props) {
    const { onUpdateDecades, onUpdateData } = props
    const { readRemoteFile } = usePapaParse();

    const handleReadRemoteFile = () => {
        const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRkq-jFTkAYNwQBTFHu66FyQCb7RC4-oBV53swan7UXTGUODR0OOUJC7taoC1BpI02u_ZrfzNIAuqO_/pub?output=csv'
        readRemoteFile(url, {
            header: true,
            transformHeader: (value: String) => {
                return value.toLowerCase().replace(' ', '_')
            },
            complete: (results) => {
                // console.log('---------------------------');
                // console.log('Results:', results);
                // console.log('---------------------------');
                let decades = new Set();
                const dataEntries = results.data.map(entry => {
                    return {
                        ...entry,
                        risk_factors: Object.keys(JSON.parse(entry.risk_factors)).join(',')
                    }
                })
                for (let index = 1; index < dataEntries.length; index++) {
                    decades.add(dataEntries[index].year)
                }

                onUpdateData(dataEntries)
                onUpdateDecades(decades)
            },
        });
    };

    return <button onClick={() => handleReadRemoteFile()}>readRemoteFile</button>;
}