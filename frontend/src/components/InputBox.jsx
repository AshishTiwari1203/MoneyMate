import React from 'react';

export function InputBox({ placeholder, label, onChange}) {
  return (
    <div className="mb-4">
      <label className="block text-left font-medium text-gray-700">{label}</label>
      <input
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200 bg-white text-black"
      />
    </div>
  );
}
