import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

const BookingWidget = (place) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const {user} = useContext(UserContext);

  useEffect(() => {
    if(user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(checkOut, checkIn);
  }

  async function bookThisPlace() {
    console.log(place.place.price); 
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place.place._id,
      price: numberOfDays * place.place.price,
    });
    const bookingId = response.data._id;
    console.log("hello");
    // setRedirect(`account/bookings/${bookingId}`)
    
    alert('booking completed')
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: ${place.place.price} / per night
        </div>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className=" py-3 px-4">
              <label>Check in: </label>
              <input
                type="date"
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
              />
            </div>
            <div className=" py-3 px-4 border-l">
              <label>Check out: </label>
              <input
                type="date"
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
              />
            </div>
          </div>
          <div className=" py-3 px-4 border-t">
            <label>Number of guests: </label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(event) => setNumberOfGuests(event.target.value)}
            />
            {numberOfDays > 0 && (
              <div className=" py-3 px-4 border-t">
                <label>Your full name: </label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <label>Phone number: </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            )}
          </div>
        </div>
        <button onClick={bookThisPlace} className="primary mt-2">
          Book this place
          {numberOfDays > 0 && (
            <span> ${numberOfDays * place.place.price}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
