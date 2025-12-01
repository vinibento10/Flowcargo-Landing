import { useEffect } from 'react';

export function N8nChat() {
  useEffect(() => {
    // Load styles
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load script
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

      createChat({
        webhookUrl: 'https://n8n.mindlinklab.com.br/webhook/a2ef1ee4-28bb-49e1-98a1-77c0232424e7/chat',
        title: "Agende sua demo e tire dúvidas",
        subtitle: "Assistente FlowCargo",
        theme: {
          chatBubble: {
            background: "linear-gradient(90deg, #7b61ff, #18d4d4)",
            textColor: "#ffffff"
          },
          launcher: {
            background: "linear-gradient(90deg, #7b61ff, #18d4d4)"
          }
        }
      });
    `;
    document.body.appendChild(script);

    return () => {
      // Cleanup if necessary (though n8n chat might not have a destroy method easily accessible)
      document.head.removeChild(link);
      document.body.removeChild(script);
      // Remove chat elements if they persist
      const chatElement = document.querySelector('.n8n-chat-widget');
      if (chatElement) chatElement.remove();
    };
  }, []);

  return null; // This component doesn't render anything itself
}
