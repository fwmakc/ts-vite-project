# AGENTS.md

## Build/Lint/Test Commands

### Build & Compilation
- `npm run dev` - Development mode with Vite dev server (port 8080)
- `npm run build` - Full production build (lint → test → compile → minify)
- `npm run compile` - TypeScript compilation only (no lint/test)
- `npm run start` - Run compiled output from `dist/`

### Linting
- `npm run lint` - Run ESLint with auto-fix
- Config: `eslint.config.js` (flat config) + `prettier.config.js`
- Supports ESLint 9+ flat config with file-specific rules

### Testing
- `npm run test` - Run all tests with Vitest
- `npm run test <pattern>` - Run single test file (e.g., `npm run test ./src/tests/example.test.ts`)
- Vitest configured with globals, jsdom environment
- Coverage: `v8` provider, `text-summary` and `html` reporters
- Test patterns: `*.test.ts`, `*.spec.ts`, `*.case.ts`

### Template-Specific Scripts
| Command | Description |
|---------|-------------|
| `yarn capacitor:compile` | Compile for Capacitor target |
| `yarn capacitor:dev` | Run Capacitor Dev App |
| `yarn capacitor:build` | Build Capacitor production APK |
| `yarn electron:build` | Build with Electron Builder |
| `yarn electron:make` | Build with Electron Forge |
| `yarn tauri:dev` | Run Tauri dev mode |
| `yarn tauri:build` | Build Tauri production |

---

## Code Style Guidelines

### TypeScript
- **Target**: ES2022
- **Module**: nodenext (main project) / ESNext (template projects)
- **Strict mode**: All strict checks enabled
- **No `any` types**: `warn` level in source, `off` in tests
- **Explicit return types**: Required for functions and modules
- **Explicit module boundaries**: Required
- **No unused variables**: Ignored if prefixed with `_`

### Imports
- **Order**: builtin → external → internal (@/*) → parent → sibling → index
- **Newlines**: Required between import groups
- **Alphabetical**: Required within groups
- **Aliases**: Use `@/*` pointing to `./src/*`

### Formatting (Prettier)
- Single quotes: `singleQuote: true`
- Semicolons: `semi: true`
- 2-space indent: `tabWidth: 2`
- 120-char width: `printWidth: 120`
- Trailing commas: `trailingComma: 'all'`
- Arrow parens: `arrowParens: 'avoid'`
- Bracket spacing: `bracketSpacing: true`

### Naming Conventions
| Type | Pattern | Example |
|------|---------|---------|
| Interfaces | `I` + PascalCase | `IRuntime`, `IPackage` |
| Classes | PascalCase | `NodeFile`, `ElectronPaths` |
| Functions | camelCase | `copyProject`, `setupCounter` |
| Constants | SCREAMING_SNAKE_CASE | `defaults`, `runtimes` |
| Files | See file naming below | |

### File Naming
- **Source**: `src/noun_verb.helper.ts`, `noun.prompt.ts`, `noun.select.ts`
- **Interfaces**: `noun.interface.ts`
- **Constants**: `noun.const.ts`
- **Components**: `noun.component.ts`
- **Tests**: `noun.test.ts`, `noun.spec.ts`
- **Cases**: `noun.case.ts`

---

## File Organization

```
src/
├── consts/          # Configuration constants
├── interfaces/      # TypeScript interfaces
├── helpers/         # Utility functions
├── prompts/         # Interactive prompts
├── select/          # Structured selection
├── package/         # Package management
└── index.ts         # Entry point

template/
├── common/          # Shared template files
├── electron/        # Electron configs
├── tauri/           # Tauri configs
├── capacitor/       # Capacitor configs
└── [tool]/          # ESLint/Biome configs
```

### Helper Files Pattern
- **Location**: `src/helpers/`
- **Naming**: `noun_verb.helper.ts`
- **Export**: `export function noun_verb(...)`
- **Returns**: `Promise<void>` or `void`

### Prompt Files Pattern
- **Location**: `src/prompts/`
- **Naming**: `noun.prompt.ts`
- **Export**: `export async function noun(...)`
- **Returns**: `Promise<string>` or `Promise<string[]>`

### Select Files Pattern
- **Location**: `src/select/`
- **Naming**: `noun.select.ts`
- **Export**: `export async function nounSelect(...)`
- **Returns**: Structured objects

### Component Files Pattern
- **Location**: `template/common/src/components/`
- **Naming**: `noun.component.ts`
- **Export**: Default export function
- **Returns**: `void`

---

## Error Handling

### Standard Error Helper
```typescript
import { error } from './helpers/error.helper.ts';

try {
  await someAsyncOperation();
} catch (err) {
  error('Context message', err);
}
```

- **Location**: `src/helpers/error.helper.ts`
- **Function**: `error(message: string, error: unknown | null)`
- **Behavior**: Prints red ❌ message, exits process

---

## Testing

###框架
- Vitest with globals enabled
- jsdom for DOM testing
- Coverage with V8 provider

### Test Files
- **Naming**: `*.test.ts`, `*.spec.ts`, `*.case.ts`
- **Location**: `src/tests/` or component subdirectories
- **Run**: `npm run test` or `npm run test ./path/to/file.test.ts`

---

## Platform Abstraction

### Filesystem
```
libs/fs/
├── classes/
│   ├── node/        # Node.js implementation
│   ├── electron/    # Electron implementation
│   ├── tauri/       # Tauri implementation
│   └── web_api/     # Browser Web API
└── interfaces/      # Type definitions
```

### Platform Detection
- `APP.isWeb`, `APP.isElectron`, `APP.isTauri`, `APP.isCapacitor`
- `APP.isBrowser`, `APP.isDesktop`, `APP.isMobile`

---

## Build Flow

```
build → lint → test → compile → minify
```

### Output Directories
- **dist/**: Compiled main project
- **build/**: Platform-specific builds

---

## Configuration Files

| File | Purpose |
|------|---------|
| `tsconfig.json` | TypeScript config (strict, ES2022) |
| `eslint.config.js` | ESLint flat config |
| `prettier.config.js` | Formatting rules |
| `vitest.config.js` | Test configuration |
| `package.json` | Scripts and dependencies |

---

## Summary

✅ **Lint**: `npm run lint` (ESLint + Prettier)  
✅ **Test**: `npm run test <file>` (Vitest)  
✅ **Build**: `npm run build` (lint → test → compile)  
✅ **Type Safety**: No `any`, explicit returns, interfaces with `I` prefix  
✅ **Imports**: Alphabetical, newlines between groups  
✅ **Formatting**: Single quotes, semicolons, 2-space indent, 120-char width  
✅ **Naming**: camelCase for functions, `I` + PascalCase for interfaces  
✅ **Files**: Helpers/prompts/selects/consts/interfaces separation  
✅ **Errors**: Use `error()` helper, always exit  
✅ **Testing**: Vitest with globals, jsdom for DOM  
