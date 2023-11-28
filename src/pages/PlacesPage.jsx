// import { useState } from "react";
import { Form, Link, Navigate, useParams } from "react-router-dom";
import AccountNavigation from "../AccountNavigation";
import axios from "axios";
import { useState, useEffect } from "react";
import PlaceImg from "../PlaceImg";
// import PlacesFormPage from "./PlacesFormPage";

export default function PlacesPage() {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);
  async function fetchAccomodation() {
    try {
      const { data } = await axios.get("/places");
      console.log(data);
      setPlaces(data);
    } catch (error) {}
  }
  useEffect(() => {
    fetchAccomodation();
  }, []);
  return (
    <div>
      <AccountNavigation />
      <div className="text-center ">
        <Link
          to={"/account/places/new"}
          className="bg-primary text-white py-2 px-6 mb-4 rounded-full inline-flex gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
        <h2>List of all added places</h2>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              key={place._id}
              className="my-3 border flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
            >
              <div className="w-32 h-32 bg-gray-500 shrink-0 flex rounded-2xl ">
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl ">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>

      {/* {action === "new" && <PlacesFormPage />} */}
    </div>
  );
}
