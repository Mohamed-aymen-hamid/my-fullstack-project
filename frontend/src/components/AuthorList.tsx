import { useState } from 'react';
import { deleteAuthor, updateAuthor } from '../utils/api';

const AuthorList = ({ authors, setAuthors }: any) => {
  const [editingAuthor, setEditingAuthor] = useState<any | null>(null);
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [booksWritten, setBooksWritten] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const handleDelete = async (id: number) => {
    await deleteAuthor(id);
    setAuthors(authors.filter((author: any) => author.id !== id));
  };

  const handleEdit = (author: any) => {
    setEditingAuthor(author);
    setName(author.name);
    setBiography(author.biography);
    setBooksWritten(author.booksWritten);
    setAverageRating(author.averageRating);
    setPhoto(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingAuthor) return;

    const hasChanges =
      name !== editingAuthor.name ||
      biography !== editingAuthor.biography ||
      photo !== null ||
      booksWritten !== editingAuthor.booksWritten ||
      averageRating !== editingAuthor.averageRating;

    if (!hasChanges) {
      setEditingAuthor(null);
      return;
    }

    if (!name || !biography) {
      alert('Name and Biography are required.');
      return;
    }

    if (booksWritten < 0 || averageRating < 0) {
      alert('Books Written and Rating cannot be negative.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('biography', biography);
    if (photo) {
      formData.append('photo', photo);
    }
    formData.append('booksWritten', booksWritten.toString());
    formData.append('averageRating', averageRating.toString());

    const updatedAuthor = await updateAuthor(editingAuthor.id, formData);

    setAuthors(
      authors.map((author: any) =>
        author.id === updatedAuthor.id ? updatedAuthor : author
      )
    );

    setEditingAuthor(null);
    setName('');
    setBiography('');
    setBooksWritten(0);
    setAverageRating(0);
    setPhoto(null);
  };

  return (
    <div>
      <h3>Authors List</h3>
      {authors.length > 0 ? (
        <ul>
          {authors.map((author: any) => (
            <li key={author.id}>
              <div className="mb-4 p-4 bg-gray-700 rounded-lg flex flex-col md:flex-row items-center gap-4">
                <img
                  src={
                    author.photo
                      ? `http://localhost:3001/${author.photo}`
                      : 'default_image.jpg'
                  }
                  alt={author.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div>
                  <h4 className="text-lg font-bold">Name: {author.name}</h4>
                  <p>Biography: {author.biography}</p>
                  <p>Books Written: {author.booksWritten}</p>
                  <p>Average Rating: {author.averageRating}</p>
                  <button onClick={() => handleDelete(author.id)}>Delete</button>
                  <button onClick={() => handleEdit(author)}>Edit</button>
                </div>
              </div>

              {editingAuthor?.id === author.id && (
                <div className="edit-form p-4 bg-gray-800 rounded-lg">
                  <h2>Edit Author</h2>
                  <form onSubmit={handleUpdate}>
                    <div>
                      <label>Name:</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Biography:</label>
                      <textarea
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Photo:</label>
                      <input
                        type="file"
                        onChange={(e) =>
                          setPhoto(e.target.files?.[0] || null)
                        }
                      />
                    </div>
                    <div>
                      <label>Books Written:</label>
                      <input
                        type="number"
                        value={booksWritten}
                        min={0}
                        onChange={(e) =>
                          setBooksWritten(Math.max(0, Number(e.target.value)))
                        }
                      />
                    </div>
                    <div>
                      <label>Average Rating:</label>
                      <input
                        type="number"
                        value={averageRating}
                        min={0}
                        max={5}
                        step={0.1}
                        onChange={(e) =>
                          setAverageRating(Math.max(0, Number(e.target.value)))
                        }
                      />
                    </div>
                    <button type="submit">Update Author</button>
                  </form>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No authors added yet.</p>
      )}
    </div>
  );
};

export default AuthorList;
