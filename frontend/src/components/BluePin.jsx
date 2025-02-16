import { useEffect, useState, useContext } from 'react';
import { Marker, Popup } from 'react-leaflet';
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

import Button from './Button';
import pinSettings from '../helpers/pinSettings';

import './BluePin.scss';

const BluePin = (props) => {
  const { blueIcon, greenIcon, orangeIcon, violetIcon } = pinSettings();
  const [pinColor, setpinColor] = useState(blueIcon);

  const { id, item} = props;
  const [claimed, setClaimed] = useState(item.claimer_id)
  const [bluePinLatitude, setBluePinLatitude] = useState(item.latitude);
  const [bluePinLongitude, setBluePinLongitude] = useState(item.longitude);
  
  const currentItem = item;

  const context = useContext(AuthContext);
  const current_user_id = context.id;

  useEffect(() => {
    //current user created an item that is claimed by another user
    if (claimed && current_user_id === currentItem.creator_id) {
      setpinColor(violetIcon);
    }
  }, [claimed]);

  useEffect(() => {
    //current user created an item that is NOT claimed by another user
    if (!claimed && current_user_id === currentItem.creator_id) {
      setpinColor(greenIcon);
    }
  }, [claimed]);

  useEffect(() => {
    //current user claimed the item
    if (claimed && current_user_id === currentItem.claimer_id) {
      setpinColor(orangeIcon);
    }
  }, [claimed]);


  useEffect(() => {
    // Unavailable for claim
    if (claimed && current_user_id !== currentItem.creator_id && current_user_id !== claimed) {
      setBluePinLatitude(null);
      setBluePinLongitude(null);
    }

  }, [claimed]);


  const claimItem = () => {
    const pinID = id;
    const userID = current_user_id

    // add user's ID as claiamer_id in DB
    return axios.put(`/api/pins/${pinID}`, { userID, pinID })
      .then((response) => {
        props.updatePin(response.data[0], pinID)
        setClaimed(current_user_id);
        setpinColor(orangeIcon);
      })
      .catch((error) => console.log("error:", error));
  };

  const unclaimItem = () => {
    const pinID = id;
    const userID = null;

    return axios.put(`/api/pins/${pinID}`, { userID, pinID })
      .then((response) => {
        props.updatePin(response.data[0], pinID)
        setClaimed(null);
        setpinColor(blueIcon);
      })
      .catch((error) => console.log("error:", error));
  };



  const deletePin = (deleteType) => {
    const pinID = id;
    return axios.delete(`/api/pins/${pinID}`, { pinID })
      .then(() => {
        if (deleteType !== 'creator delete') {
          alert("You are awesome! One more item saved from the landfill!");
        } 
        setBluePinLatitude(null);
        setBluePinLongitude(null);
        props.deletePin(pinID);
      })
      .catch((error) => {
        console.log("error message:", error);
      });
  };


  return bluePinLatitude === null ? null : (

    <Marker position={[bluePinLatitude, bluePinLongitude]} icon={pinColor}>
      <Popup className="pin-popup__new">

        {/* item info */}
        <h1 className="pin-popup__new-title">{currentItem.title}</h1>
        <p>{currentItem.description}</p>
        <img className="pin-popup__new-picture" src={`${currentItem.picture}`} alt='Item' />
        <p><strong>Condition:</strong> {currentItem.condition}</p>

        {/* messages for claimed items */}
        {claimed && currentItem.claimer_id === current_user_id && <p className="pin-popup__new-buttons-claimed">You claimed this {currentItem.title}. Please pick up at your earliest convenience.</p>}
        {claimed && currentItem.creator_id === current_user_id && <p className="pin-popup__new-buttons-claimed">This item has been claimed!</p>}

        <div className="pin-popup__new-buttons">
          {!claimed && current_user_id !== currentItem.creator_id && <Button claimed onClick={() => claimItem()}>Claim</Button>}
          {claimed && current_user_id !== currentItem.creator_id && <Button claimed onClick={() => unclaimItem()}>Unclaim</Button>}
          {claimed && current_user_id !== currentItem.creator_id && <Button cancel onClick={() => deletePin('claimer delete')}>Picked up</Button>}
          {current_user_id === currentItem.creator_id && <Button cancel onClick={() => deletePin('creator delete')}>Delete</Button>}
        </div>

      </Popup>
    </Marker>
  )
}

export default BluePin;