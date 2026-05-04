// src/components/ChatBox.jsx
import React, { useEffect, useRef } from 'react'; // Import React, useEffect (for side effects), and useRef (for DOM reference)

// ChatBox component receives the array of messages and a boolean indicating if a translation is in progress
export default function ChatBox({ messages, isTranslating }: { messages: Array<any>; isTranslating: boolean }) {
  // Create a ref to attach to the bottom of the message list so we can automatically scroll to it
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // A helper function to smoothly scroll the chat view to the newest message
  const scrollToBottom = () => {
    // Check if the ref is attached to an element, then call scrollIntoView
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Run the scrollToBottom function every time the messages array or isTranslating state changes
  useEffect(() => {
    // Trigger scroll logic on side-effect change
    scrollToBottom();
  }, [messages, isTranslating]);

  return (
    // The main container for the chat area: flexible, scrollable, and light background
    <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 flex flex-col gap-5 scroll-smooth">

      {/* If there are no messages, show a friendly placeholder screen */}
      {messages.length === 0 && (
        // Container taking full height to center the placeholder content vertically and horizontally
        <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
          {/* Decorative icon for empty state */}
          <div className="bg-chatbot-light p-4 rounded-full mb-4 inline-flex items-center justify-center shadow-sm">
            <svg className="w-12 h-12 text-chatbot-DEFAULT" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          </div>
          {/* Welcoming text indicating how to use the app */}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Welcome to LLM Translator</h3>
          <p className="text-gray-500 text-sm max-w-sm">Type a message below to see the translation in your selected target language.</p>
        </div>
      )}

      {/* Iterate over each message in the state to render its bubble */}
      {messages.map((msg, idx) => {
        // Boolean flag to determine the origin of the message
        const isUser = msg.role === 'user';

        return (
          // Wrapper for each individual message to handle alignment (right for user, left for llm)
          <div
            key={idx} // Unique key identifier using index structure
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeInUp`} // Conditionally apply justify classes
          >
            {/* The actual chat bubble containing the text */}
            <div
              className={`max-w-[85%] md:max-w-[75%] px-5 py-3.5 rounded-2xl shadow-sm text-[15px] md:text-base leading-relaxed ${isUser
                ? 'bg-chatbot-DEFAULT text-white rounded-br-none' // Styles for the user: green background, white text, no rounding on bottom-right
                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none' // Styles for LLM: white background, gray text, no rounding on bottom-left
                }`}
            >
              {/* Display the message text content */}
              {msg.text}
            </div>
          </div>
        );
      })}

      {/* Conditionally render the "Translating..." indicator if the background process is running */}
      {isTranslating && (
        // Wrapper for the translating indicator, aligned to the left (LLM side)
        <div className="flex justify-start animate-pulse">
          {/* Bubble style similar to the LLM messages but with a pale green color to indicate system activity */}
          <div className="max-w-[85%] md:max-w-[75%] px-5 py-3.5 rounded-2xl rounded-bl-none bg-chatbot-light text-chatbot-dark border border-green-200 text-[15px] md:text-base flex items-center gap-3 shadow-sm">

            {/* Animated spinning loader icon using an SVG */}
            <svg className="animate-spin h-5 w-5 text-chatbot-DEFAULT" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>

            {/* The literal text requested by the user */}
            <span className="font-semibold tracking-wide">Translating...</span>
          </div>
        </div>
      )}

      {/* A dummy empty div element used exclusively as a target anchor for the scrollToBottom logic */}
      <div ref={messagesEndRef} className="h-1 lg:h-px bg-transparent" />
    </div>
  );
}
