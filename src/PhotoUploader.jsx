import { useState } from "react";
import axios from "axios";
export default function PhotoUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");
  //   const [addedPhotos, setAddedPhotos] = useState("");
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      Link: photoLink,
    });

    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
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
