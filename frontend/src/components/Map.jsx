import { MapContainer, TileLayer } from "react-leaflet";
import { useContext } from 'react';

import UserLocation from "./UserLocation";
import Pin from "./Pin";
import BluePin from "./BluePin";
import { AuthContext } from "../providers/AuthProvider";

import "./Map.scss";

const Map = (props) => {
  const mapPosition = [45.4, -73.6];
  const mapTilesId = "mapbox/streets-v11";
  const mapAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const context = useContext(AuthContext);
  const current_user_id = context.id;

  const {
    latitude,
    longitude,
    setLatitude,
    setLongitude,
    newItemMode,
    savedItems,
    creator_id,
    claimer_id
  } = props;

  const newItem = {
    title: "New Item Form Data",
    description: "Your new item data will show here after you press the save button."
  };


  //any blue pin: 

  const parsedPins = savedItems

    ? savedItems.map((savedItem) => {

      return (
        <BluePin key={savedItem.id} id={savedItem.id} item={savedItem} />
      );

    })
    : [];

  return (
    <MapContainer center={mapPosition}>
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/${mapTilesId}/tiles/{z}/{x}/{y}?access_token=${mapAccessToken}`}
      />
      <UserLocation />
      <Pin
        item={newItem}
        allItems={savedItems}
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        newItemMode={newItemMode}
      />
      {parsedPins}
    </MapContainer>
  );
};

export default Map;
