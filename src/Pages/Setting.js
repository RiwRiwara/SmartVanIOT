import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onlyget, post } from '../Services/api';
import { Grid, TextField, Button, Snackbar, IconButton, Stack, Typography, Switch } from '@mui/material';
import { BackHand, Close, Label } from '@mui/icons-material';

function Setting() {
    const [WebData, setWebData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [IsEnable, setIsEnable] = useState();

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleChange = (event) => {
        setWebData({ ...WebData, [event.target.id]: event.target.value });
    }

    const fetchWebData = async () => {
        await onlyget('/setting?id=1').then((response) => {
            console.log(response.data);
            if (response.data.isOpenNotification === "1") {
                setIsEnable(true);
            } else {
                setIsEnable(false);
            }
            setWebData(response.data);
        }).catch((error) => {
            console.log(error);
        }
        );

        setIsLoading(false);
    }

    const handleSave = async () => {
        await post('/setting', WebData).then((response) => {
            console.log(response.data);
            setOpen(true);
        }).catch((error) => {
            console.log(error);
        }
        );
    }
    useEffect(() => {
        fetchWebData();
    }
        , []);


    return (
        <div className="h-max flex justify-center " style={{ paddingTop: '80px' }}>
            <div className='bg-stone-100 p-4 rounded-md'>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4} sm={8} md={12} key={0}>
                        <p style={{ fontSize: '2em', fontWeight: 'bold' }}>System setting</p>
                    </Grid>
                    <Grid item xs={2} sm={4} md={6} key={1}>
                        <Stack direction="column" spacing={1} alignItems="center">
                            <Typography sx={{ fontSize: "1.5rem" }}>Line Notification</Typography>
                            <Stack direction="row" spacing={1} alignItems="center">

                                <Typography>Off</Typography>
                                <Switch
                                    checked={IsEnable}
                                    onChange={(e) => {
                                        setIsEnable(e.target.checked);
                                        setWebData({ ...WebData, isOpenNotification: e.target.checked ? "1" : "0" });
                                    }}

                                />
                                <Typography>On</Typography>
                            </Stack>
                        </Stack>

                    </Grid>
                    <Grid item xs={2} sm={4} md={6} key={2}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="status"
                            label="Status"
                            variant="outlined"
                            value={WebData.status || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} key={4}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="speed"
                            label="List Day (1-7 as comma ,)"
                            variant="outlined"
                            value={WebData.listDay || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4} sm={4} md={6} key={5}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="speed"
                            label="Start Time"
                            type='time'
                            variant="outlined"
                            value={WebData.startTime || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4} sm={4} md={6} key={6}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="speed"
                            type='time'
                            label="End Time"
                            variant="outlined"
                            value={WebData.endTime || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6} key={3}>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
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

export default Setting;
