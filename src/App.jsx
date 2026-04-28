// src/App.jsx
import React, { useState } from 'react'; // React ecosystem imports
import Sidebar from './components/Sidebar'; // Import the newly created Sidebar component
import ChatBox from './components/ChatBox'; // Import the messages display area component
import MessageInput from './components/MessageInput'; // Import the user text input area component
import { translateText } from './services/api'; // Import the mock API or your own stub

// App is the root container component that manages the core state of the complete application
function App() {
  // STATE: Target language selection. Default is set to 'Spanish'
  const [targetLanguage, setTargetLanguage] = useState('Spanish');

  // STATE: The chat history array, storing objects to demarcate user queries vs LLM translations
  const [messages, setMessages] = useState([]);

  // STATE: Boolean tracking whether an API request (translation) is currently in-flight
  const [isTranslating, setIsTranslating] = useState(false);

  // Core business logic to handle the submission of a new user message
  const handleSendMessage = async (text) => {
    // 1. Add the new user message to the chat array functionally to ensure latest state is preserved
    setMessages(prev => [...prev, { role: 'user', text }]);

    // 2. Set the loading flag to True to trigger the UI "Translating..." indicator
    setIsTranslating(true);

    try {
      // 3. Initiate the mock/real external API asynchronous translation request
      const translatedData = await translateText(text, targetLanguage);

      // 4. Once successful, append the translated result to the chat feed as the LLM role
      setMessages(prev => [...prev, { role: 'llm', text: translatedData }]);
    } catch (error) {
      alert(error);
      // Catch network errors and display an error response bubble to the user
      setMessages(prev => [...prev, { role: 'llm', text: "Error: Could not translate your message." }]);
      console.error("Translation logic failed:", error); // Log to the developer console for debugging
    } finally {
      // 5. Always turn off the 'translating' state regardless of success or failure
      setIsTranslating(false);
    }
  };

  return (
    // Application Shell: Take up viewport height and set up flex layout to divide sidebar and chat
    <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden text-gray-800 font-sans">

      {/* Mobile/Tablet View: Render the sidebar at the top instead of the left edge if the screen is small */}
      <div className="md:hidden w-full h-auto flex-shrink-0 z-20 border-b border-green-200">
        {/* Pass down the state hook getter and setter pair to alter the dropdown */}
        <Sidebar
          selectedLanguage={targetLanguage}
          onSelectLanguage={setTargetLanguage}
        />
      </div>

      {/* Desktop View: Render the sidebar on the left side of the screen natively */}
      <div className="hidden md:block h-full flex-shrink-0 relative z-20">
        {/* Sidebar props sync global state */}
        <Sidebar
          selectedLanguage={targetLanguage}
          onSelectLanguage={setTargetLanguage}
        />
      </div>

      {/* The primary content zone. It occupies all remaining horizontal space (flex-1) */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative shadow-md z-10 w-full bg-white">

        {/* Top visual accent matching the green motif */}
        <div className="h-1.5 w-full bg-gradient-to-r from-chatbot-DEFAULT to-chatbot-dark flex-shrink-0"></div>

        {/* Reusable ChatBox component receiving historical chats and the live loading state var */}
        <ChatBox messages={messages} isTranslating={isTranslating} />

        {/* Reusable MessageInput component bound to the submission function and locked whilst translating */}
        <MessageInput onSendMessage={handleSendMessage} disabled={isTranslating} />
      </main>
    </div>
  );
}

// Export the component for Vite/React entry points
export default App;
