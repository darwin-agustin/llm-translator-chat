// src/components/Sidebar.jsx
import React from 'react';
import { getLanguages } from '../services/api';
import { useState, useEffect } from 'react';

// The Sidebar component receives the current selected language and a function to update it
export default function Sidebar({ selectedLanguage, onSelectLanguage, hasNewLanguage }: {
   selectedLanguage: string; onSelectLanguage: (lang: string) => void; hasNewLanguage: any }) {

  const [majorLanguages, setMajorLanguages] = useState<string[]>([]);
  const [philippineDialects, setPhilippineDialects] = useState<string[]>([]);

  useEffect(() => {
    getLanguages(false).then(setMajorLanguages);
    getLanguages(true).then(setPhilippineDialects);
  }, [hasNewLanguage]);
  return (
    // Sidebar container: taking full height, fixed width on desktop, green-tinted background
    <aside className="w-full md:w-64 bg-panel-bg border-r border-green-200 p-4 flex flex-col h-full shadow-inner z-20 relative">

      {/* Title section with styling for the sidebar */}
      <h2 className="text-xl font-semibold text-chatbot-dark mb-6 flex items-center gap-2">
        {/* Simple inline SVG icon for decoration */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        Translator App
      </h2>
      
      <label htmlFor="language-select" className="text-sm font-medium text-gray-700 mb-2">
        Target Language
      </label>

      <select
        id="language-select"
        value={selectedLanguage} // Controlled component value
        onChange={(e) => onSelectLanguage(e.target.value)} // Event handler to update state in parent
        className="w-full p-2.5 bg-white border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-chatbot-DEFAULT focus:border-chatbot-DEFAULT text-gray-800 transition-colors cursor-pointer appearance-none"
      >
        <optgroup label="Major Languages">
          {majorLanguages.map(major => (
            <option key={major} value={major}>{major}</option>
          ))}
        </optgroup>

        <optgroup label="Philippine Dialects">
          {philippineDialects.map(dialect => (
            <option key={dialect} value={dialect}>{dialect}</option>
          ))}
        </optgroup>
      </select>

      <p className="mt-4 text-xs text-green-700 opacity-80 leading-relaxed text-justify">
        Select the language you want your text translated into. The LLM will use this as the target representation.
      </p>

      <p className="mt-4 text-xs text-green-700 opacity-80 leading-relaxed text-justify">
        This translator was made as my POC. This should use two routing LLM models for cost efficiency. Either go with the fastest, expensive one first or cheapest first.
      </p>
    </aside>
  );
}
