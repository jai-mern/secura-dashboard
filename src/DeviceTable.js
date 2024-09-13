import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeviceTable = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://webportal.securamtc.in/devices/', {
            auth: {
                username: 'secura',
                password: 'lookman!234'
            }
        })
        .then(response => {
            setDevices(response.data.data); // Adjust based on the actual response structure
            setLoading(false);
        })
        .catch(err => {
            setError(err);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading devices: {error.message}</p>;

    return (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
                <tr style={{ backgroundColor: '#4CAF50', color: 'white', textAlign: 'center' }}>
                    <th>ID</th>
                    <th>Fleet Number</th>
                    <th>Serial No</th>
                    <th>MNVR IP</th>
                    <th>Camera IP 1</th>
                    <th>Camera IP 2</th>
                    <th>Camera IP 3</th>
                    <th>FW Version</th>
                    {/* Add more headers as needed */}
                </tr>
            </thead>
            <tbody>
                {devices.map((device) => (
                    <tr key={device.id} style={{ textAlign: 'center', backgroundColor: device.id % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                        <td>{device.id}</td>
                        <td>{device.Fleet_Number}</td>
                        <td>{device.serialNo}</td>
                        <td>{device.MNVR_IP}</td>
                        <td>{device.CameraIP1}</td>
                        <td>{device.CameraIP2}</td>
                        <td>{device.CameraIP3}</td>
                        <td>{device.FW_VERSION}</td>
                        {/* Add more cells as needed */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DeviceTable;
