import React, { useState } from 'react'; // Import React and useState hook

// MessageInput component receives the onSendMessage callback and the disabled state (when translating)
export default function MessageInput({ onSendMessage, disabled }: { 
  onSendMessage: (text: string) => void; disabled: boolean }) {
  // Local state to track the text currently typed in the input field
  const [inputText, setInputText] = useState('');

  // Handler function triggered when the form is submitted
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    // Prevent the default form submission page-reload behavior
    e.preventDefault();

    // Check if the input is empty or just whitespace; if so, abort submission
    if (!inputText.trim()) {
      return;
    }
    // Execute the callback passed via props with the current input text
    onSendMessage(inputText);

    // Reset the input field to be empty after sending
    setInputText('');
  };

  return (
    // The wrapper form acting as a container structure for the input controls
    // Using a form allows hitting 'Enter' to submit natively
    <form
      onSubmit={handleSubmit} // Attach the submit handler
      className="bg-white border-t border-gray-200 p-4 md:px-6 md:py-4 flex items-center gap-3 relative z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
    >
      {/* The main text input element */}
      <input
        type="text" // Input type is standard text
        value={inputText} // Bind the value to the component state
        onChange={(e) => setInputText(e.target.value)} // Update the state when the user types
        disabled={disabled} // Disable typing if a translation is currently in progress
        placeholder="Type a message to translate..." // Text to show when the field is empty
        className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 rounded-full px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-chatbot-DEFAULT focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-inner"
      />

      {/* The generic submit button */}
      <button
        type="submit" // Tell the form this button triggers submission
        disabled={disabled || !inputText.trim()} // Disable the button if translating or text is empty
        className="bg-chatbot-DEFAULT hover:bg-chatbot-dark hover:scale-105 active:scale-95 text-white rounded-full p-3.5 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chatbot-DEFAULT cursor-pointer"
        aria-label="Send message" // Accessibility label for screen readers
      >
        {/* An SVG representing a paper airplane "send" icon */}
        <svg className="w-5 h-5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
      </button>
    </form>
  );
}
