import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

import "./NewItemForm.scss";

const NewItemForm = (props) => {
  const { longitude, latitude, setLatitude, setLongitude } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("New");
  const [picture, setPicture] = useState("");

  //current user
  const context = useContext(AuthContext);
  const id = context.id;

  const handleErrorMessageReset = context.handleErrorMessageReset;
  const errorMessage = context.errorMessage;
  const setErrorMessage = context.setErrorMessage;
  const setUsername = context.setUsername;

  const handleSavePin = () => {
    if (!longitude || !latitude) {
      setErrorMessage("Please select a location on the map");
    }
    if (
      title === "" ||
      description === "" ||
      condition === "" ||
      picture === ""
    ) {
      console.log("ERROR");
      setErrorMessage("Please fill all the fields");
      return;
    }
    validateSavePin({
      title,
      description,
      condition,
      picture,
      longitude: longitude.toFixed(4),
      latitude: latitude.toFixed(4),
      creator_id: id,
      date: currentDate(),
    });
  };

  const validateSavePin = (itemData) => {
    const tokenKey = localStorage.getItem("token");
    return axios
      .post("/api/pins", itemData, { headers: { token: tokenKey } })
      .then(() => {
        setUsername();
      })
      .then(() => {
        setErrorMessage("Your item has been posted")
        setTimeout(window.location.reload(), 3000);
      });
  };
  useEffect(() => {
    handleErrorMessageReset();
  }, []);

  const deletePin = () => {
    setLatitude(null);
    setLongitude(null);
  };

  const currentDate = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    return today.toDateString();
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <section className="new-item">
      <h1>{errorMessage}</h1>
      <h1 className="new-item-form__title">New Item</h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        autoComplete="off"
        className="form"
      >
        <label className="new-item-form__label">Title</label>
        <input
          className="new-item__input"
          name="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label className="new-item-form__label">Description</label>
        <textarea
          className="new-item__text-area"
          name="description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <label className="new-item-form__label">Condition</label>
        <select
          className="new-item__select"
          name="condition"
          value={condition}
          onChange={(event) => setCondition(event.target.value)}
        >
          <option value="New">New</option>
          <option value="Like new">Like new</option>
          <option value="Fair">Fair</option>
          <option value="Old">Old</option>
          <option value="Small imperfections">Small imperfections</option>
          <option value="Damaged">Damaged</option>
        </select>

        <label className="new-item-form__label">Picture</label>
        <input
          className="new-item__input"
          name="picture"
          type="text"
          placeholder="https://www.picture-url.com"
          value={picture}
          onChange={(event) => setPicture(event.target.value)}
        />
        <div className="new-item-form__buttons">
          <Button confirm onClick={() => handleSavePin()} type="Submit">
            Save
          </Button>
          <Link to="/mapview">
            <Button cancel onClick={() => deletePin()}>
              Cancel
            </Button>
          </Link>
        </div>
      </form>
      <div>
        <br />
        <br />

        <Button cancel onClick={() => logout()}>
          Logout
        </Button>

      </div>
    </section>
  );
};
export default NewItemForm;
