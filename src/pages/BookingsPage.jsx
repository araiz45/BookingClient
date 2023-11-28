import axios from "axios";
import AccountNavigation from "../AccountNavigation";
import { useEffect, useState } from "react";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/bookings");
      console.log(data);
      setBookings(data);
    })();
  }, []);
  return (
    <div>
      <AccountNavigation />
      <div className="flex flex-col gap-4">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
              to={`/account/booking/${booking._id}`}
            >
              <div className="w-[20rem]">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 grow pr-3">
                <h2 className="text-xl">{booking.place.title}</h2>
                <BookingDates booking={booking} />
                <div className="text-xl">
                  <span className="text-sm text-gray-700">Rs</span>
                  {booking.price} rupees in{" "}
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn)
                  )}{" "}
                  <span className="text-sm text-gray-700">nights</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
