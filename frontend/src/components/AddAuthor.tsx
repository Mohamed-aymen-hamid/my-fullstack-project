import { useState, useRef } from 'react';
import { addAuthor } from '../utils/api';

interface AddAuthorProps {
  setAuthors: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddAuthor = ({ setAuthors }: AddAuthorProps) => {
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [booksWritten, setBooksWritten] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !biography || !photo) {
      alert('Please fill all fields, including the photo.');
      return;
    }

    if (booksWritten < 0 || averageRating < 0) {
      alert('Books Written and Average Rating cannot be negative.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('biography', biography);
    formData.append('photo', photo);
    formData.append('booksWritten', booksWritten.toString());
    formData.append('averageRating', averageRating.toString());

    const newAuthor = await addAuthor(formData);
    if (newAuthor) {
      setAuthors((prev) => [...prev, newAuthor]);
    }

    // Reset form
    setName('');
    setBiography('');
    setBooksWritten(0);
    setAverageRating(0);
    setPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Author</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block font-semibold">Biography:</label>
          <textarea
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block font-semibold">Photo:</label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block font-semibold">Books Written:</label>
          <input
            type="number"
            value={booksWritten}
            min={0}
            onChange={(e) =>
              setBooksWritten(Math.max(0, Number(e.target.value)))
            }
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block font-semibold">Average Rating:</label>
          <input
            type="number"
            value={averageRating}
            min={0}
            max={5}
            step="0.1"
            onChange={(e) =>
              setAverageRating(Math.max(0, Number(e.target.value)))
            }
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Add Author
        </button>
      </form>
    </div>
  );
};

export default AddAuthor;
