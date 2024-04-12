import React from 'react'
import { useState } from 'react'
export default function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
 <div className="border border-gray-200 p-3">
    <div className={`flex rounded-lg ${isOpen?'bg-blue-300':null}`}>
      <button
        className="w-full text-left py-2 px-4 font-bold hover:bg-gray-100 focus:outline-none flex justify-between "
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
{isOpen? <svg className="text-right hover:bg-gray-100 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
</svg>
:<svg className="text-right hover:bg-gray-100 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg> }
        
      </button>
     
</div>
      {isOpen && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
};