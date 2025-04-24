import React from 'react';

interface Card {
  id: number;
  name: string;
  email: string;
}

const CardComponent: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition-all">
      <p className="text-gray-400 text-sm">ID: {card.id}</p>
      <h2 className="text-xl font-semibold text-gray-800">{card.name}</h2>
      <p className="text-gray-600">{card.email}</p>
    </div>
  );
};

export default CardComponent;
