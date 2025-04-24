import React from 'react';
import UserInterface from '@/components/UserInterface';

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-10">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-8 text-amber-950">👋 Welcome to the User Management System</h1>
        <UserInterface backendName="go" />
      </div>
    </main>
  );
};

export default Home;
