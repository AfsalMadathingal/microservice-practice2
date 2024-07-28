import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-zinc-800 dark:text-white">
          Welcome to the Home Page!
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mt-5">
          You are successfully logged in.
        </p>
        <div className="mt-10">
          {/* Add your home page content here */}
          <div className="bg-blue-100 dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">
              Home Page Content
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              This is a placeholder for your home page content. You can add more components, features, and content here as per your requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
