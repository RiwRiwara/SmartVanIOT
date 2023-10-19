import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onlyget, post } from '../Services/api';
import { cleanVanData } from '../Services/CleansData';
import { Grid, TextField, Button, Snackbar, IconButton, Typography, Switch, Stack } from '@mui/material';
import { Close, ClosedCaption } from '@mui/icons-material';

function VanSetting() {
    const { van_id } = useParams();
    const [vanData, setVanData] = useState({});
    const [toggle, setToggle] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [IsEnable, setIsEnable] = useState();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <ClosedCaption fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const fetchVanData = async () => {
        setIsLoading(true);
        try {
            const response = await onlyget('/api/van/get-van?van_id=' + van_id);
            setVanData(response.data);
            if (response.data.isOpenNotification === "1") {
                setIsEnable(true);
            } else {
                setIsEnable(false);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchVanData();
    }, [toggle]);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setVanData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSave = async () => {
        await post('/api/van/van', vanData).then((response) => {
            setVanData(response.data);
            setToggle(!toggle);
            setOpen(true);
        }).catch((error) => {
            console.log(error);
        }
        );
    };

    return (
        <div className="h-max flex justify-center " style={{ paddingTop: '80px' }}>
            <div className=' p-4 rounded-md'>

                <Grid container p={{ md: 5 }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4} sm={8} md={12} key={1}>
                        <p style={{ fontSize: '2em', fontWeight: 'bold' }}>Configure Van</p>
                        <p>ปรับแก้ไขข้อมูลรถ</p>
                        <p style={{ fontSize: '1em', fontWeight: 'bold' }}>VAN ID: {van_id}</p>
                    </Grid>
                    <Grid item xs={2} sm={4} md={6} key={2}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="driver_name"
                            label="Driver Name"
                            variant="outlined"
                            value={vanData.driver_name || ''}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6} key={3}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="status"
                            label="Driver Telephone (เบอร์โทรศัพท์) "
                            variant="outlined"
                            value={vanData.status || ''}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6} key={5}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="image_data"
                            label="Image URL (ใส่ลิ้งรูปภาพ))"
                            variant="outlined"
                            value={vanData.image_data || ''}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6} key={6}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="passenger"
                            label="Number Passengers"
                            variant="outlined"
                            type='number'
                            value={vanData.passenger || 0}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6} key={7}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="speed"
                            label="Speed"
                            type='number'
                            variant="outlined"
                            value={vanData.speed || ''}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6} key={8}>
                        <Typography sx={{ fontSize: "1.5rem" }}>Line Notification</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">

                            <Typography>Off</Typography>
                            <Switch
                                checked={IsEnable}
                                onChange={(e) => {
                                    setIsEnable(e.target.checked);
                                    setVanData({ ...vanData, isOpenNotification: e.target.checked ? "1" : "0" });
                                }}

                            />
                            <Typography>On</Typography>
                        </Stack>

                    </Grid>
                    <Grid item xs={2} sm={4} md={6} key={4}>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Update Van Data
                        </Button>
                    </Grid>
                </Grid>
            </div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Update Success"
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <Close fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}

export default VanSetting;
