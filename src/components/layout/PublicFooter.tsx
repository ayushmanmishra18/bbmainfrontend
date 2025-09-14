// src/components/layout/PublicFooter.tsx
import React from "react";

const PublicFooter = () => {
  return (
    <footer className="w-full bg-subtle dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Bloodbankgroup.com. All Rights
          Reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="hover:underline">
            About Us
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
