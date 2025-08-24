# Chess.com Clone

A modern, real-time chess application built with Next.js, WebSocket server, and a monorepo architecture using Turborepo.

## 🏗️ Project Structure

This is a monorepo containing multiple applications and packages:

```
chess.com/
├── apps/
│   ├── web/          # Next.js frontend application
│   └── ws/           # WebSocket server for real-time game logic
├── packages/
│   ├── ui/           # Shared React components
│   ├── eslint-config/ # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
├── turbo.json        # Turborepo configuration
└── package.json      # Root package configuration
```

## 🚀 Technologies

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js WebSocket server with chess.js for game logic
- **Build Tool**: Turborepo for monorepo management
- **Package Manager**: Bun
- **Authentication**: JWT-based authentication
- **Real-time Communication**: WebSocket (ws library)

## 📋 Prerequisites

- Node.js >= 18
- Bun 1.2.20 (recommended package manager)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chess.com
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

## 🏃‍♂️ Development

### Start all applications in development mode
```bash
bun run dev
```

This will start:
- **Web app** on `http://localhost:3000`
- **WebSocket server** on the configured port

### Individual application development

**Web Application:**
```bash
cd apps/web
bun run dev
```

**WebSocket Server:**
```bash
cd apps/ws
bun run dev
```

## 📦 Available Scripts

### Root level scripts:
- `bun run build` - Build all applications
- `bun run dev` - Start all applications in development mode
- `bun run lint` - Run linting across all packages
- `bun run format` - Format code with Prettier
- `bun run check-types` - Run TypeScript type checking

### Individual app scripts:
- `bun run build` - Build the application
- `bun run dev` - Start development server
- `bun run lint` - Run ESLint
- `bun run check-types` - Run TypeScript type checking

## 🎮 Features

### Web Application (`apps/web`)
- Modern React-based chess interface
- Real-time game updates via WebSocket
- Responsive design with Tailwind CSS
- TypeScript for type safety

### WebSocket Server (`apps/ws`)
- Real-time chess game management
- Game state synchronization
- JWT-based authentication
- Chess.js integration for game logic

### Shared Packages
- **UI Package**: Reusable React components
- **ESLint Config**: Consistent code style across packages
- **TypeScript Config**: Shared TypeScript configuration

## 🏗️ Architecture

### Monorepo Benefits
- **Shared dependencies**: Common packages reduce duplication
- **Consistent tooling**: Unified linting, formatting, and type checking
- **Fast builds**: Turborepo caching for efficient development
- **Atomic changes**: Coordinate changes across multiple packages

### Real-time Game Flow
1. Players connect to the WebSocket server
2. Game state is managed server-side using chess.js
3. Moves are validated and broadcast to all players
4. Frontend updates in real-time via WebSocket events

## 🔧 Configuration

### Environment Variables
Create `.env` files in the respective app directories as needed:

**Web App** (`apps/web/.env.local`):
```
NEXT_PUBLIC_WS_URL=ws://localhost:8080
```

**WebSocket Server** (`apps/ws/.env`):
```
PORT=8080
JWT_SECRET=your-secret-key
```

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Format code with Prettier
- Use shared UI components from `@repo/ui`

### Adding New Features
1. Create feature in appropriate app (`web` or `ws`)
2. Add shared logic to packages if needed
3. Update types in `typescript-config` if necessary
4. Test across all affected packages

## 🚀 Deployment

### Build for Production
```bash
bun run build
```

### Individual App Deployment
```bash
# Web app
cd apps/web
bun run build
bun run start

# WebSocket server
cd apps/ws
bun run build
node dist/index.js
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For questions or issues, please open an issue in the repository.
