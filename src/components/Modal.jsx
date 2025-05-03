import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 overflow-y-auto">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          </div>
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-500 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:text-white"
            onClick={onClose}
          >
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
          <div className="p-4 md:p-5 space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
