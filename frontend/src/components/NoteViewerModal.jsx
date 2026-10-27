// src/components/NoteViewerModal.jsx
import React from 'react';
import { HiXMark } from 'react-icons/hi2';

export const NoteViewerModal = ({ note, onClose }) => {
  if (!note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-4xl h-[85vh] bg-base-100 rounded-3xl shadow-xl flex flex-col overflow-hidden border border-base-content/10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-content/10">
          <h3 className="font-bold text-lg text-base-content truncate">{note.title}</h3>
          <button
            onClick={onClose}
            className="btn.sm.circle btn-ghost"
            aria-label="Close viewer"
          >
            <HiXMark className="size-5" />
          </button>
        </div>

        {/* Viewer Body */}
        <div className="flex-1 w-full h-full bg-base-200/50 overflow-auto">
          {note.fileUrl?.endsWith('.pdf') ? (
            <iframe
              src={note.fileUrl}
              title={note.title}
              className="w-full h-full border-none"
            />
          ) : note.fileUrl?.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
            <div className="flex items-center justify-center h-full p-4">
              <img
                src={note.fileUrl}
                alt={note.title}
                className="max-h-full max-w-full object-contain rounded-xl"
              />
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm text-base-content/70">
                Preview not supported for this file format.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
