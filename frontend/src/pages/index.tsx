import { useEffect, useState } from 'react';
import AddAuthor from '../components/AddAuthor';

import AuthorList from '../components/AuthorList';

import { getAuthors } from '../utils/api';

const Home = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const authorsData = await getAuthors();
      if (authorsData) setAuthors(authorsData);
    };
    fetchAuthors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Author Management System</h1>
      <AddAuthor setAuthors={setAuthors} />
      <div className="mt-12">
        <AuthorList authors={authors} setAuthors={setAuthors} />
      </div>
    </div>
  );
};

export default Home;
