import { useState, useEffect } from "react";
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
  Edit3
} from "lucide-react";

function App() {
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("Agentica: Deepcoder 14B Preview (free)");
  const [selectedRouter, setSelectedRouter] = useState("OpenRouter");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMessage("");
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
          <span>2:38</span>
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
      <div className="main-content">
        <div className="loading-dots">
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
        </div>
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
              <span>{selectedModel}</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* API Key */}
        <div className="input-section">
          <label className="input-label">OpenRouter API Key:</label>
          <div className="input-row">
            <div className="input-field error">
              <span style={{ color: '#ef4444' }}>●</span>
              <span style={{ color: '#ef4444', marginLeft: '8px' }}>Not Set (Please set via UI or ENV_VAR)</span>
            </div>
            <button className="button secondary">
              <Edit3 size={14} />
            </button>
            <button className="button">
              <Key size={14} />
              Get API Key
            </button>
          </div>
        </div>

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
            />
            <button 
              className="send-button"
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
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
    </div>
  );
}

export default App;
