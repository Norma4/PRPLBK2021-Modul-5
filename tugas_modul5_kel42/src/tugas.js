import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import "./tugas.css";

const ThemeContext = createContext();

const lightAppBar = {
    backgroundColor:'#cfe8fc',
    color:'#000000',
};

const darkAppBar = {
    backgroundColor : '#e8898a',
    color:'#ffffff',
};

export default function Tugas() {

    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);

    const [nama, setNama] = useState("");
    const [nim, setNim] = useState("");
    const [ttl, setTtl] = useState("");
    const [jk, setJk] = useState("");
    const [alamat, setAlamat] = useState("");
    const [email, setEmail] = useState("");

    const [valueTheme, setValueTheme] = useState(true);

    const lightStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#cfe8fc',
        borderRadius: 1,
        boxShadow: 24,
        p: 4,
    };

    const darkStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#e8898a',
        borderRadius: 1,
        boxShadow: 24,
        p: 4,
    };

    const light = {
        backgroundColor:'#7facf5',
        color:'#000000',
    };

    const dark = {
        backgroundColor : '#751719',
        color:'#ffffff',
    };

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:3001/profil",
            headers: {
                accept: "*/*",
            },
        })
        .then((data) => {
            console.log(data.data);
                setData(data.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const handleButton = (profiles) => {
        setModal(true);
        setNama(profiles.nama);
        setNim(profiles.nim);
        setTtl(profiles.ttl);
        setJk(profiles.jk);
        setAlamat(profiles.alamat);
        setEmail(profiles.email);
    };

    return (
        <ThemeContext.Provider value={valueTheme}>
            <div className={`contentWrapper ${valueTheme === true ? 'light' : 'dark'}`}>
                <AppBar position="fixed" sx={{ top: 0, bottom: 'auto' }} style={valueTheme === true ? light : dark} >
                    <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        List Data Mahasiswa
                    </Typography>
                    <Button variant="outlined" onClick={() => {setValueTheme(valueTheme === true ? false : true)}}>Change Theme</Button>
                    </Toolbar>
                </AppBar>
                <Grid container md={11} spacing={4} style={{ marginTop: "100px", marginLeft: "auto", marginRight: "auto" }}>
                    {data.map((profile) => {
                        return (
                            <Grid item key={profile.id} md={3}>
                                <Card>
                                    <CardActionArea onClick={() => handleButton(profile)}>
                                        <CardContent style={valueTheme === true ? light : dark}>
                                            <Typography>Nama : {profile.nama}</Typography>
                                            <Typography>NIM : {profile.nim}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
                <Content />
                <Modal
                    open={modal}
                    onClose={() => setModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 700,
                    }}
                >
                    <Fade in={modal}>
                        <Box sx={valueTheme === true ? lightStyle : darkStyle}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Detail Mahasiswa
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Nama : {nama}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                NIM : {nim}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                TTL : {ttl}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Jenis Kelamin : {jk}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Alamat : {alamat}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Email : {email}
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </ThemeContext.Provider>
    );
}

function Content() {
    const theme = useContext(ThemeContext);
    return (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }} style={theme === true ? lightAppBar : darkAppBar}>
            <Toolbar>
                <Typography align="center" component="div" sx={{ flexGrow: 1 }}>
                    Kelompok 42
                </Typography>
            </Toolbar>
        </AppBar>
    );
}