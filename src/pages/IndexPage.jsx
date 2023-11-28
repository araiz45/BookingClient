import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/all-places");
      console.log(data);
      setPlaces(data);
    })();
  }, []);
  return (
    <>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-x-6 gap-y-8">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={"/place/" + place._id} className="" key={place._id}>
              <div className="bg-gray-500 rounded-2xl flex mb-2">
                <img
                  src={"http://localhost:4000/uploads/" + place?.photos[0]}
                  alt="me"
                  className="rounded-2xl object-cover aspect-square "
                />
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <h4 className="mt-1 font-bold">
                &#x20A8;{place.price}{" "}
                <span className="text-sm text-gray-500">per night</span>
              </h4>
            </Link>
          ))}
      </div>
    </>
  );
}
