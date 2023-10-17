import * as React from 'react';
import VanCard from '../Components/CarCard';
import { onlyget , del} from '../Services/api';
import { Button } from '@mui/material';


function Home() {
    const [vanDataList, setVanDataList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [isFirstLoad, setIsFirstLoad] = React.useState(true);

    const handleRedirectVan = (path) => {
        window.location.href = `/van/${path}`
    }
    const handleRedirectSettingVan = (path) => {
        window.location.href = `/van-setting/${path}`
    }
    const handleDelete = async (van_id) => {
        const confirmed = window.confirm("Are you sure you want to delete this van?");
        if (confirmed) {
            await del('/api/van/delete-van', { van_id:  van_id}).then((res) => {
                console.log(res.data);
                alert("Delete success");
            }).catch((err) => console.log(err))
        } else {
        }
    }


    React.useEffect(() => {
        const fetchVanData = async () => {
            await onlyget('/api/van/get-all-van').then((res) => {
                res.data.map((van, index) => {
                    var vanData = {
                        van_id: van.van_id,
                        imageUrl: "https://www.bkkkids.com/wp-content/uploads/2014/08/SchoolVan.jpg",
                        title: van.van_id,
                        description: `Driver name : ${van.driver_name}`,
                        id: index + 1
                    }
                    setVanDataList((vanDataList) => [...vanDataList, vanData])
                })
            }
            ).catch((err) => console.log(err))
            setLoading(false);
        }
        if (isFirstLoad || vanDataList.length === 0) {
            fetchVanData();
            setIsFirstLoad(false);
        }

    }, []);


    return (
        <div className="h-max" >
            <div style={{ paddingTop: "80px", }}>
                <p className='text-center my-4' style={{ fontSize: "2rem", fontWeight: "bolder" }}>All vans</p>
                <div id="section1" className='flex justify-center gap-4'>
                    {vanDataList.map((van, index) => (
                        <div key={index} id={`section${index + 1}`} className='flex justify-center gap-4'>
                            <VanCard
                                key={van.id}
                                imageUrl={van.imageUrl}
                                title={van.title}
                                description={van.description}
                                onShare={() => handleRedirectVan(van.van_id)}
                                onLearnMore={() => handleRedirectSettingVan(van.van_id)}
                                onDelete = {() => handleDelete(van.van_id)}
                            />
                        </div>
                    ))}
                    <div key={99} id={`section${99}`} className='flex justify-center gap-4'>
                        <Button variant="contained" href="/add-van" style={{ backgroundColor: "#829BDD", color: "white" }}>Add Van</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home