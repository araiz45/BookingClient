import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWiget from "../components/BookingWiget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    (async () => {
      try {
        const { data } = await axios.get("/api/accomodations/place/" + id);
        console.log(data);
        setData(data);
      } catch (error) {
        alert("Some thing went wrong Please tryagain later");
      }
    })();
  }, [id]);

  return (
    <>
      {data && (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
          <h1 className="text-3xl">{data.title}</h1>
          <AddressLink data={data} />
          <PlaceGallery data={data} />

          <div className="grid md:grid-cols-[2fr_1fr] grid-cols-1 mt-8 gap-8 mb-8">
            <div className="px-2">
              <div className=" my-4">
                <h2 className="font-semibold text-2xl">Description</h2>
                <p className="">{data.description}</p>
              </div>
              Check-In: {data.checkIn}
              <br />
              Check-Out: {data.checkOut}
              <br />
              Max-Guests: {data.maxGuests}
            </div>
            <div className="">
              <BookingWiget place={data} />
            </div>
          </div>
          <div>
            <div className="bg-white py-8 px-8 rounded-2xl mt-6 -mx-8 border-t">
              <div className="">
                <h2 className="font-semibold text-2xl">Extra Info</h2>
              </div>
              <div className="text-sm text-gray-800 my-1 leading-5">
                {data.extraInfo}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
