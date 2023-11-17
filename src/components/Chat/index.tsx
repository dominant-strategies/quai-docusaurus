import { useEffect } from 'react';

function ChatbaseScript() {
  useEffect(() => {
    // First Script
    const script1 = document.createElement('script');
    script1.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "Ty1rfEGMMzM9kCa3kZH9x",
        domain: "www.chatbase.co"
      };
    `;
    document.body.appendChild(script1);

    // Second Script
    const script2 = document.createElement('script');
    script2.src = 'https://www.chatbase.co/embed.min.js';
    script2.setAttribute('chatbotId', 'Ty1rfEGMMzM9kCa3kZH9x');
    script2.setAttribute('domain', 'www.chatbase.co');
    script2.defer = true;
    document.body.appendChild(script2);
  }, []);

  return null;
}

export default ChatbaseScript;
