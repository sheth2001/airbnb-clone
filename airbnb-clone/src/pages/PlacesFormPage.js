import React, { useEffect, useState } from "react";
import axios from 'axios';
import PhotosUploader from '../PhotosUploader'
import Perks from '../Perks'
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

const PlacesFormPage = () => {
  const {id} = useParams();
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState();
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState(14);
  const [checkOut, setCheckOut] = useState(12);
  const [maxGuests, setMaxGuests] = useState(2);
  
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);


  useEffect(() => {
    if(!id) {
      return;
    }

     axios.get('/places/' + id).then(res => {
      const {data} = res;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price)
     });
  }, [id])

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    );
  }

  const savePlace = async (event) => {
    event.preventDefault();
    const placeData = {
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    };
    if(id) {
      await axios.put("/places", {
        id, ...placeData       
      });
    } else {
      axios.post("/places", placeData);
    };
      setRedirect(true);
  }

  if(redirect) {
    return <Navigate to={'/account/places'} /> 
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "title for your place. should be short and catchy as in advertisement."
        )}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title, for exampfle: My lovely apt"
        />

        {preInput("Address", "address to your place.")}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="address"
        />

        {preInput("Photos", "more=better")}
        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

        {preInput("Description", "description of the place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {preInput("Perks", "select all the perks of your place")}
        <Perks selected={perks} onChange={setPerks} />

        {preInput("Extra info", "house rules, etc.")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {preInput(
          "Check in&out times",
          "add check in and out times, remember to have some time window for cleaning the rooms between guests"
        )}
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              placeholder="12"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="100"
            />
          </div>
        </div>
        <button className="primary mt-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
