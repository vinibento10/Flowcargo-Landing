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
        mode: 'window',
        target: '#n8n-chat',
        showWelcomeScreen: true,
        defaultLanguage: 'pt',
        initialMessages: [
          'Olá! 👋',
          'Sou o Harry, assistente virtual da FlowCargo. Como posso ajudar você hoje?'
        ],
        i18n: {
          en: {
            title: 'Harry Agente Logístico',
            subtitle: 'Tire dúvidas sobre nosso sistema',
            footer: '',
            getStarted: 'Iniciar conversa',
            inputPlaceholder: 'Outra coisa...',
          },
        },
        style: {
          width: '400px',
          height: '600px',
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          zIndex: 9999,
          bgcolor: '#0b0b0f',
          color: '#ffffff',
        },
        theme: {
          main: '#7b61ff',
          avatar: {
            bgcolor: '#7b61ff',
            color: '#ffffff',
            src: window.location.origin + '/images/harry-avatar.png',
          },
          userMessage: {
            bgcolor: '#18d4d4',
            color: '#000000',
          },
          botMessage: {
            bgcolor: '#1e1e24',
            color: '#ffffff',
          },
          input: {
            bgcolor: '#1e1e24',
            color: '#ffffff',
            placeholderColor: '#a1a1aa',
          },
          header: {
            bgcolor: '#0b0b0f',
            color: '#ffffff',
            titleColor: '#ffffff',
            subtitleColor: '#a1a1aa',
          },
        }
      });
    `;
    document.body.appendChild(script);

    // Custom CSS to override n8n chat styles for Glassmorphism effect
    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --n8n-chat-primary-color: #7b61ff !important;
        --n8n-chat-secondary-color: #18d4d4 !important;
        --n8n-chat-background-color: #0b0b0f !important;
        --n8n-chat-font-family: 'Inter', sans-serif !important;
      }
      
      .n8n-chat-widget {
        --chat--header-background: #0b0b0f !important;
        --chat--header-color: #ffffff !important;
        --chat--background: #0b0b0f !important;
        --chat--message-bot-background: #1e1e24 !important;
        --chat--message-bot-color: #ffffff !important;
        --chat--message-user-background: #18d4d4 !important;
        --chat--message-user-color: #000000 !important;
        --chat--input-background: #1e1e24 !important;
        --chat--input-color: #ffffff !important;
        --chat--toggle-background: linear-gradient(135deg, #7b61ff 0%, #18d4d4 100%) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 16px !important;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5) !important;
        backdrop-filter: blur(12px) !important;
        overflow: hidden !important;
      }

      .n8n-chat-widget .chat-header {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
      }

      .n8n-chat-widget .chat-input-container {
        border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
      }
      
      .n8n-chat-widget .chat-toggle {
        box-shadow: 0 0 20px rgba(123, 97, 255, 0.4) !important;
        transition: transform 0.3s ease !important;
      }
      
      .n8n-chat-widget .chat-toggle:hover {
        transform: scale(1.05) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
      document.head.removeChild(style);
      const chatElement = document.querySelector('.n8n-chat-widget');
      if (chatElement) chatElement.remove();
    };
  }, []);

  return null;
}
