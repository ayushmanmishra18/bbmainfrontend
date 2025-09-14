// src/components/ui/Card.tsx
import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div 
      className={`bg-background dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md border border-subtle dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;