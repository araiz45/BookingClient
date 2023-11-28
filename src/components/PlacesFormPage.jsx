import { useState, useEffect } from "react";
import Perks from "./Perks";
import axios from "axios";
import PhotoUploader from "./PhotoUploader";
import AccountNavigation from "./AccountNavigation";
import { Navigate, useParams } from "react-router-dom";
export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(100);
  useEffect(() => {
    if (!id) {
      return;
    }
    try {
      axios.get("/api/accomodations/places/" + id).then((response) => {
        const { data } = response;
        console.log(data);
        setTitle(data.title);
        setAddress(data.address);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setDescription(data.description);
        setAddedPhotos(data.photos);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setPrice(data.price);
      });
    } catch (error) {
      alert("Something went wrong");
    }
  }, [id]);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    try {
      axios
        .post("/api/photo/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const { data: filenames } = response;
          console.log(filenames);
          setAddedPhotos((prev) => {
            return [...prev, ...filenames];
          });
        });
    } catch (error) {
      alert("Something went wrong");
    }
  }
  function savePlace(ev) {
    ev.preventDefault();
    const dataSending = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // update
      const { data: responseData } = axios.put("/api/accomodations/places", {
        id,
        ...dataSending,
      });
      setRedirect(true);
    } else {
      // new place
      const { data: responseData } = axios.post("/places", dataSending);
      setRedirect(true);
    }
  }
  function removePhoto(ev, filename) {
    ev.preventDefault();
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  }
  function selectedAsMainPhoto(ev, filename) {
    ev.preventDefault();
    const addedPhotosWithOutSelected = addedPhotos.filter(
      (photo) => photo !== filename
    );
    const newAddedPhotos = [filename, ...addedPhotosWithOutSelected];
    setAddedPhotos(newAddedPhotos);
  }
  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <AccountNavigation />
      <form className="" onSubmit={savePlace}>
        {preInput(
          "Title",
          "title for your place should short and catchy as in advertisment"
        )}
        <input
          type="text"
          name=""
          id=""
          placeholder="title, for example: My Lovely Apartment"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        {preInput("Address", "Address to this place")}
        <input
          type="text"
          name=""
          id=""
          placeholder="address"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />
        {preInput("Photos", "more = better")}
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-6 md:grid-cols-4 mt-2">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div
                className="h-32 flex relative"
                key={Date.now().toString() + link}
              >
                <img
                  src={"http://localhost:4000/uploads/" + link}
                  className="rounded-2xl w-full object-cover position-center"
                />
                <button
                  onClick={(ev) => removePhoto(ev, link)}
                  className="absolute bottom-2 right-2 text-white bg-primary p-1 cursor-pointer rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={(ev) => selectedAsMainPhoto(ev, link)}
                  className={`absolute bottom-2 left-2 p-1 cursor-pointer rounded-full ${
                    link === addedPhotos[0]
                      ? "text-primary bg-white"
                      : "text-white bg-primary"
                  } `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          <label className="h-32 border bg-transparent rounded-2xl cursor-pointer p-2 items-center text-2xl text-gray-600 flex justify-center gap-1">
            <input
              type="file"
              className="hidden"
              onChange={uploadPhoto}
              multiple
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            Upload
          </label>
        </div>
        {preInput("Description", "description of the place ")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Perks", "Select all the perks of your place")}
        <Perks selected={perks} onChange={setPerks} />
        {preInput("Extra Info", "House rules etc.")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput(
          "Check In & out times",
          "Add check in and out times, remember to have some time window for clearning the room between guests"
        )}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 grid-cols-2 gap-2">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="14"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              placeholder="11"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price Per night</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <div>
          <button className="primary my-2">Save</button>
        </div>
      </form>
    </>
  );
}
