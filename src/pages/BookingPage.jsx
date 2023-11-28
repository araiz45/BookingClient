import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";
import BookingDates from "../components/BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      try {
        axios.get("/api/book/bookings").then((response) => {
          const foundBooking = response.data.find(({ _id }) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
          }
        });
      } catch (error) {
        alert("Something went wrong");
      }
    }
  }, [id]);
  console.log(booking);
  if (!booking) {
    return "";
  }
  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink data={booking.place} />
      <div className="bg-gray-200 p-4 mb-4 rounded-2xl flex justify-between">
        <div>
          <h2 className="text-xl">Your booking information</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-5 text-white rounded-2xl flex justify-center items-center">
          Total Price: Rs <span className="text-2xl">{booking.price}</span>
        </div>
      </div>
      <PlaceGallery data={booking.place} />
    </div>
  );
}
