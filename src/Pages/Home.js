import React, { useState, useEffect } from 'react';
import VanCard from '../Components/CarCard';
import { onlyget, del } from '../Services/api';
import { Button } from '@mui/material';

function Home() {
    const [vanDataList, setVanDataList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const itemsPerRow = 4;

    const handleRedirectVan = (path) => {
        window.location.href = `/van/${path}`;
    };

    const handleRedirectSettingVan = (path) => {
        window.location.href = `/van-setting/${path}`;
    };

    const handleDelete = async (van_id) => {
        const confirmed = window.confirm("Are you sure you want to delete this van?");
        if (confirmed) {
            try {
                // Assuming del returns a promise
                await del('/api/van/delete-van', { van_id: van_id });
                alert("Delete success");
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        const fetchVanData = async () => {
            try {
                const response = await onlyget('/api/van/get-all-van');
                const vanData = response.data.map((van, index) => ({
                    van_id: van.van_id,
                    imageUrl: "https://www.bkkkids.com/wp-content/uploads/2014/08/SchoolVan.jpg",
                    title: van.van_id,
                    description: `Driver name: ${van.driver_name}`,
                    id: index + 1
                }));
                setVanDataList(vanData);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        if (isFirstLoad || vanDataList.length === 0) {
            fetchVanData();
            setIsFirstLoad(false);
        }
    }, [isFirstLoad, vanDataList.length]);

    const chunkedVanData = Array.from(
        { length: Math.ceil(vanDataList.length / itemsPerRow) },
        (_, index) => vanDataList.slice(index * itemsPerRow, (index + 1) * itemsPerRow)
    );

    return (
        <div className="h-max">
            <div style={{ paddingTop: "80px" }}>
                <p className='text-center my-4' style={{ fontSize: "2rem", fontWeight: "bolder" }}>
                    <div className='mx-4'>All vans (รถทั้งหมด)</div>
                    <Button variant="contained" href="/add-van" style={{ backgroundColor: "#829BDD", color: "white" }}>Add Van</Button>
                </p>

                <div id="section1" className='flex flex-wrap justify-center gap-4'>
                    {vanDataList.map((van, index) => (
                        <>
                            {van.title !== null && (
                                <div key={van.id} className='w-1/4 p-4'>
                                    <VanCard
                                        key={van.id}
                                        imageUrl={van.imageUrl}
                                        title={van.title}
                                        description={van.description}
                                        onShare={() => handleRedirectVan(van.van_id)}
                                        onLearnMore={() => handleRedirectSettingVan(van.van_id)}
                                        onDelete={() => handleDelete(van.van_id)}
                                    />
                                </div>
                            )}
                        </>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default Home;
