# Bolt AI - Intelligent Code Assistant

Bolt AI is a modern, intelligent code assistant powered by advanced AI models through OpenRouter. Built with React, TypeScript, and Tailwind CSS, it provides a sleek mobile-first interface for AI-powered coding assistance.

## Features

- 🤖 **Advanced AI Models**: Support for multiple AI models including Agentica Deepcoder 14B
- 🎨 **Modern UI**: Beautiful dark theme with purple accents matching the latest design trends
- 📱 **Mobile-First**: Responsive design optimized for mobile devices
- ⚡ **Real-time**: Fast and responsive interface with loading animations
- 🔧 **OpenRouter Integration**: Seamless integration with OpenRouter API
- 🎯 **Code-Focused**: Specialized for coding tasks and development workflows

## Screenshots

The application features a modern mobile browser interface with:
- Status bar with battery, network, and time indicators
- Browser navigation with address bar
- Gradient header with user branding and action icons
- Central content area with loading animations
- Bottom input panel with model selection and API key management
- Toolbar with attachment, voice, and download options

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Desktop**: Tauri (optional)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bolt-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
# or
bun run build
```

### Desktop App (Optional)

To build the desktop application using Tauri:

```bash
npm run tauri dev
# or
yarn tauri dev
# or
bun run tauri dev
```

## Configuration

### OpenRouter API Key

1. Visit [OpenRouter](https://openrouter.ai/) to get your API key
2. Set the API key in the application interface
3. Or set the environment variable: `OPENROUTER_API_KEY`

### Model Selection

The application supports various AI models through OpenRouter:
- Agentica: Deepcoder 14B Preview (free)
- Other models available through OpenRouter

## Development

### Project Structure

```
src/
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
├── styles.css           # Global styles and theme
└── components/          # Reusable components
```

### Key Components

- **Mobile Browser Interface**: Simulates a mobile browser experience
- **Status Bar**: Shows device status indicators
- **Browser Navigation**: Address bar and navigation controls
- **App Header**: Gradient header with user branding
- **Input Panel**: Model selection and message input
- **Toolbar**: Action buttons for attachments and features

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenRouter](https://openrouter.ai/) for AI model access
- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://reactjs.org/) for the UI framework

---

Built with ❤️ by YOUSEF SH
