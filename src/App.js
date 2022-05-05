import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import citiesData from "./data.json";
import Routing from "./Routing";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: "yellow",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    }
  }
}));

export default function App() {
  const classes = useStyles();
  const position = [-1, 30];
  const [cities, setCities] = useState([]);
  const [sourceCity, setSourceCity] = useState({});
  const [destinationCity, setDestinationCity] = useState({});
  useEffect(() => {
    citiesData.map((eachCity) => setCities((cities) => [...cities, eachCity]));
  }, []);

  return (
    <div className="leaflet-container">
      <div className="container">
        <Autocomplete
          id="combo-box-demo"
          options={cities}
          onChange={(event, value) => {
            console.log(value);
            setSourceCity(value);
          }}
          classes={classes}
          size="small"
          PaperComponent={({ children }) => (
            <Paper style={{ background: "yellow" }} elevation={10}>
              {children}
            </Paper>
          )}
          getOptionLabel={(option) => `${option.city}, ${option.country}`}
          inputRoot={{ borderColor: "white" }}
          style={{ width: 300, paddingBottom: "5%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              color="secondary"
              label="Source"
              variant="outlined"
              InputLabelProps={{
                style: { color: "white" }
              }}
            />
          )}
        />
        <Autocomplete
          id="combo-box-demo1"
          classes={classes}
          onChange={(event, value) => {
            console.log(value);
            setDestinationCity(value);
          }}
          options={cities}
          size="small"
          PaperComponent={({ children }) => (
            <Paper style={{ background: "yellow" }} elevation={10}>
              {children}
            </Paper>
          )}
          getOptionLabel={(option) => `${option.city}, ${option.country}`}
          style={{ width: 300, paddingBottom: "5%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={({ target }) => setDestinationCity(target.value)}
              color="secondary"
              label="Destination"
              variant="outlined"
              InputLabelProps={{
                style: { color: "white" }
              }}
            />
          )}
        />
      </div>

      <MapContainer
        center={position}
        zoom={10}
        style={{ height: "100%", width: "100%", position: "relative" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="-1.985070"
        />
        {Object.keys(sourceCity).length > 0 &&
          Object.keys(destinationCity).length > 0 && (
            <Routing
              sourceCity={sourceCity}
              destinationCity={destinationCity}
            />
          )}
      </MapContainer>
    </div>
  );
}
