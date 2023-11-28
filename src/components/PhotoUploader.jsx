import { useState } from "react";
import axios from "axios";
export default function PhotoUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");
  //   const [addedPhotos, setAddedPhotos] = useState("");
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    try {
      const { data: filename } = await axios.post("/api/photo/upload-by-link", {
        Link: photoLink,
      });
      onChange((prev) => {
        return [...prev, filename];
      });
      setPhotoLink("");
    } catch (error) {
      alert("Something went wrong");
    }
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Add using a link .... jpg"
        value={photoLink}
        onChange={(ev) => setPhotoLink(ev.target.value)}
      />
      <button className="bg-gray-200 px-4 rounded-2xl" onClick={addPhotoByLink}>
        Add&nbsp;Photo
      </button>
    </div>
  );
}
