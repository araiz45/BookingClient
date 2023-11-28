import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
export default function BookingWiget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
      // console.log(user.name);
    }
  }, [user]);
  let numberOfDays = 0;

  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log(place);
    const placeGoing = {
      place: place._id,
      price: numberOfDays * place.price,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
    };
    try {
      const { data } = await axios.post("/api/book/bookings", placeGoing);
      console.log(data._id);
      setRedirect(`/account/booking/${data._id}`);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <>
      <div className="bg-white shadow shadow-gray-400 p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: &#x20A8;{place.price} / per night
        </div>
        <div className="rounded-2xl border my-4 border-gray-600">
          <div className="grid grid-cols-2">
            <div className="p-4 ">
              <label>Check in: </label>
              <input
                type="date"
                name=""
                id=""
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="p-4 border-l border-gray-600">
              <label>Check out: </label>
              <input
                type="date"
                name=""
                id=""
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div className="p-4 border-t border-gray-600">
            <label>Number of guests </label>
            <input
              type="number"
              name=""
              id=""
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
          </div>
          {numberOfDays > 0 && (
            <>
              <div className="p-4 border-t border-gray-600">
                <label>Your Full Name</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="John Doe"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
              </div>
              <div className="px-4 pb-4 border-gray-600">
                <label className="">phone</label>
                <input
                  type="tel"
                  name=""
                  id=""
                  placeholder="03350234992"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                />
              </div>
            </>
          )}
        </div>
        <button className="primary" onClick={handleSubmit}>
          Book this place
          {numberOfDays > 0 ? (
            <span> in &#x20A8;{numberOfDays * place.price}</span>
          ) : (
            ""
          )}
        </button>
      </div>
    </>
  );
}
