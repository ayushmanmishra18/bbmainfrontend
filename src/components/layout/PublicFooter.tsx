import React from 'react';

const PublicFooter = () => {
  return (
    <footer className="py-6">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Bloodbankgroup.com. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default PublicFooter;

