"use client";
import React from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300">
      {/* Modal Panel */}
      <div className="bg-background dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl m-4 transform transition-all duration-300">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-subtle dark:border-gray-700">
          <h3 className="text-xl font-semibold text-content dark:text-gray-200">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 rounded-full p-1 hover:bg-subtle dark:hover:bg-gray-600 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;