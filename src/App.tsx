import { useState, useEffect, useRef } from "react";
import { 
  MoreVertical, 
  Plus, 
  Home, 
  Brain, 
  FolderOpen, 
  Rocket, 
  MessageSquare, 
  ChevronDown,
  Send,
  Paperclip,
  Sparkles,
  Mic,
  Download,
  Zap,
  Key,
  Edit3,
  Copy,
  Check,
  AlertCircle
} from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Model {
  id: string;
  name: string;
  provider: string;
  pricing: string;
}

function App() {
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("agentica/deepcoder-14b-preview");
  const [selectedRouter, setSelectedRouter] = useState("OpenRouter");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Available models
  const models: Model[] = [
    { id: "agentica/deepcoder-14b-preview", name: "Agentica: Deepcoder 14B Preview (free)", provider: "Agentica", pricing: "Free" },
    { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", pricing: "Paid" },
    { id: "openai/gpt-4o", name: "GPT-4o", provider: "OpenAI", pricing: "Paid" },
    { id: "meta-llama/llama-3.1-8b-instruct", name: "Llama 3.1 8B Instruct", provider: "Meta", pricing: "Free" }
  ];

  // Load API key from localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem("bolt_ai_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !apiKey) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "Bolt AI"
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            {
              role: "system",
              content: "You are Bolt AI, an intelligent coding assistant. Help users with programming tasks, code reviews, debugging, and development questions. Provide clear, concise, and practical solutions."
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: "user",
              content: message
            }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error("API Error:", err);
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleApiKeySave = (key: string) => {
    setApiKey(key);
    localStorage.setItem("bolt_ai_api_key", key);
    setShowApiKeyInput(false);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getApiKeyStatus = () => {
    if (!apiKey) return { status: "error", text: "Not Set (Please set via UI or ENV_VAR)" };
    if (apiKey.length < 10) return { status: "error", text: "Invalid API Key" };
    return { status: "success", text: "✓ API Key Set" };
  };

  const apiKeyStatus = getApiKeyStatus();

  return (
    <div className="mobile-browser">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-bar-left">
          <span>🔋</span>
          <span>📶</span>
          <span>📶</span>
          <span>TA K/S</span>
        </div>
        <div className="status-bar-right">
          <span>{new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Browser Navigation */}
      <div className="browser-nav">
        <div className="nav-icon">
          <MoreVertical size={16} />
        </div>
        <div className="nav-icon">
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>D</span>
        </div>
        <div className="nav-icon">
          <Plus size={16} />
        </div>
        <div className="address-bar">
          <span style={{ fontSize: '12px' }}>⚙️</span>
          <span>1f.boltt22.pages.dev</span>
        </div>
        <div className="nav-icon">
          <Home size={16} />
        </div>
      </div>

      {/* App Header */}
      <div className="app-header">
        <div className="header-left">
          <span>YOUSEF SH</span>
        </div>
        <div className="header-right">
          <div className="header-icon">
            <span style={{ fontSize: '14px' }}>&lt;&gt;</span>
          </div>
          <div className="header-icon">
            <Brain size={16} />
            <ChevronDown size={12} style={{ marginLeft: '2px' }} />
          </div>
          <div className="header-icon">
            <FolderOpen size={16} />
            <ChevronDown size={12} style={{ marginLeft: '2px' }} />
          </div>
          <div className="header-icon">
            <Rocket size={16} />
            <ChevronDown size={12} style={{ marginLeft: '2px' }} />
          </div>
          <div className="header-icon">
            <MessageSquare size={16} />
          </div>
          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.3)' }}></div>
          <div className="header-icon">
            <span style={{ fontSize: '14px' }}>&lt;&gt;</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content" style={{ flexDirection: 'column', padding: '20px', overflowY: 'auto' }}>
        {messages.length === 0 ? (
          <div className="loading-dots">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: '600px' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  marginBottom: '16px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-card)',
                  color: '#ffffff',
                  maxWidth: '80%',
                  marginLeft: msg.role === 'user' ? 'auto' : '0',
                  wordWrap: 'break-word'
                }}
              >
                <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                  {msg.content}
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  opacity: 0.7, 
                  marginTop: '8px',
                  textAlign: msg.role === 'user' ? 'right' : 'left'
                }}>
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'var(--color-card)',
                color: '#ffffff',
                maxWidth: '80%',
                marginBottom: '16px'
              }}>
                <div className="loading-dots" style={{ justifyContent: 'flex-start' }}>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Panel */}
      <div className="input-panel">
        {/* OpenRouter Dropdown */}
        <div className="input-section">
          <label className="input-label">OpenRouter</label>
          <div className="input-row">
            <div className="input-field" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{selectedRouter}</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* Model Selection */}
        <div className="input-section">
          <label className="input-label">Model</label>
          <div className="input-row">
            <div className="input-field" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{models.find(m => m.id === selectedModel)?.name || selectedModel}</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* API Key */}
        <div className="input-section">
          <label className="input-label">OpenRouter API Key:</label>
          <div className="input-row">
            <div className={`input-field ${apiKeyStatus.status === 'error' ? 'error' : ''}`}>
              <span style={{ color: apiKeyStatus.status === 'error' ? '#ef4444' : '#22c55e' }}>●</span>
              <span style={{ 
                color: apiKeyStatus.status === 'error' ? '#ef4444' : '#22c55e', 
                marginLeft: '8px' 
              }}>
                {apiKeyStatus.text}
              </span>
            </div>
            <button 
              className="button secondary"
              onClick={() => setShowApiKeyInput(true)}
            >
              <Edit3 size={14} />
            </button>
            <button className="button">
              <Key size={14} />
              Get API Key
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="input-section">
            <div style={{
              padding: '12px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              color: '#ef4444',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={14} />
              {error}
            </div>
          </div>
        )}

        {/* Main Input */}
        <div className="input-section">
          <div className="main-input-container">
            <textarea
              className="main-input"
              placeholder="How can Bolt help you today?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={3}
              disabled={!apiKey || isLoading}
            />
            <button 
              className="send-button"
              onClick={handleSendMessage}
              disabled={!message.trim() || !apiKey || isLoading}
              style={{ opacity: (!message.trim() || !apiKey || isLoading) ? 0.5 : 1 }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Toolbar */}
        <div className="bottom-toolbar">
          <div className="toolbar-icon">
            <Paperclip size={16} />
          </div>
          <div className="toolbar-icon">
            <Sparkles size={16} />
          </div>
          <div className="toolbar-icon">
            <Mic size={16} />
          </div>
          <div className="toolbar-icon">
            <Download size={16} />
          </div>
          <div className="toolbar-icon">
            <ChevronDown size={16} />
          </div>
          <div className="toolbar-icon active">
            <Zap size={16} />
            <span className="toolbar-text">sdadmdy8 secur...</span>
          </div>
        </div>
      </div>

      {/* API Key Input Modal */}
      {showApiKeyInput && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--color-card)',
            padding: '24px',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '400px'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#ffffff' }}>Set OpenRouter API Key</h3>
            <input
              type="password"
              placeholder="Enter your OpenRouter API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                background: 'var(--color-input)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: '#ffffff',
                marginBottom: '16px'
              }}
            />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowApiKeyInput(false)}
                style={{
                  padding: '8px 16px',
                  background: 'var(--color-secondary)',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleApiKeySave(apiKey)}
                style={{
                  padding: '8px 16px',
                  background: 'var(--color-primary)',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
