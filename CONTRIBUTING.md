# Contributing to Peptide Screener

Thank you for your interest in contributing! 🎉

## Quick Start DevOps Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/my-awesome-feature
# or
git checkout -b fix/some-bug
```

### 2. Make Changes & Test Locally
```bash
# Test everything locally before pushing
npm run ci:local

# Or test individual parts:
npm run lint
npm run build
npm audit --audit-level=high
```

### 3. Push & Create PR
```bash
git add .
git commit -m "feat: add awesome feature"
git push origin feature/my-awesome-feature
```

Then create a Pull Request on GitHub → CI will run automatically!

## Branch Structure
- `main` - Production-ready code (protected)
- `develop` - Integration branch for features  
- `feature/*` - New features
- `fix/*` - Bug fixes

## CI Pipeline
- ✅ **Lint**: Code quality checks
- ✅ **Build**: Ensure app compiles
- ✅ **Security**: Check for vulnerabilities
- ✅ **Bundle Size**: Keep app size reasonable
- ✅ **Deploy**: Auto-deploy main branch

## That's it! 🚀
The CI system will catch issues automatically, making development safe and fun!