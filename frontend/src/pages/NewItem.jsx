import NewItemForm from "../components/NewItemForm";
import Map from "../components/Map";
import SidebarHeader from "../components/SidebarHeader";

import "./NewItem.scss";

const NewItem = (props) => {
  const {
    latitude,
    longitude,
    setLatitude,
    setLongitude,
    newItemMode,
    oldPins,
    setOldPins,
  } = props;

  return (
    <div className="container">
      <Map
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        newItemMode={newItemMode}
        savedItems={oldPins}
        setOldPins={setOldPins}
      />

      <section className="sidebar">
        <img
          className="bg-image"
          src="images/trunk.jpg"
          alt="background for decoration only"
        />

        <div className="sidebar__text">
          <SidebarHeader />
          <NewItemForm
            latitude={latitude}
            longitude={longitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        </div>
      </section>
    </div>
  );
};

export default NewItem;
