# GitHub Actions CI/CD Documentation

This repository uses GitHub Actions for automated continuous integration and deployment. The CI/CD pipeline includes multiple workflows for different purposes.

## Workflows Overview

### 1. Main CI/CD Pipeline (`ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` branch

**Jobs:**
- **Code Quality & Linting**: ESLint, TypeScript compilation, Prettier formatting
- **Build Application**: Builds both web and Electron versions
- **Security Audit**: Checks for vulnerabilities and security issues
- **Bundle Analysis**: Monitors bundle size and performance
- **Deploy Preview**: Creates preview deployments for PRs (Netlify)
- **Production Deployment**: Deploys to production on main branch pushes

### 2. Electron Release (`release.yml`)

**Triggers:**
- Git tags matching `v*` (e.g., `v1.0.0`)
- Manual workflow dispatch

**Jobs:**
- **Create Release Draft**: Prepares GitHub release
- **Build Electron App**: Cross-platform builds (Windows, macOS, Linux)
- **Publish Release**: Makes the release public with all assets

### 3. Dependency Management (`dependencies.yml`)

**Triggers:**
- Weekly schedule (Mondays at 9 AM UTC)
- Manual workflow dispatch

**Jobs:**
- **Update Dependencies**: Automated dependency updates with PR creation
- **Security Audit**: Weekly security vulnerability scanning

### 4. Performance Monitoring (`performance.yml`)

**Triggers:**
- Push to `main` branch
- Pull requests to `main` branch
- Weekly schedule (Sundays at 6 AM UTC)

**Jobs:**
- **Bundle Size Analysis**: Tracks bundle size changes
- **Performance Benchmarks**: Lighthouse CI and custom performance tests
- **Memory Usage Analysis**: Monitors memory consumption patterns

## Required Secrets

To enable all features, configure these secrets in your GitHub repository:

### Deployment Secrets
```
NETLIFY_AUTH_TOKEN    # Netlify authentication token
NETLIFY_SITE_ID       # Netlify site identifier
```

### Optional Secrets
```
GITHUB_TOKEN          # Automatically provided by GitHub
```

## Branch Protection Rules

Recommended branch protection settings for `main`:

- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
  - `Code Quality & Linting`
  - `Build Application`
  - `Security Audit`
- ✅ Require branches to be up to date before merging
- ✅ Include administrators

## Release Process

### Automated Releases

1. **Create a git tag** following semantic versioning:
   ```bash
   git tag v1.2.3
   git push origin v1.2.3
   ```

2. **GitHub Actions will automatically:**
   - Create a release draft
   - Build for all platforms (Windows, macOS, Linux)
   - Upload release assets
   - Publish the release

### Manual Releases

1. Go to **Actions** → **Electron Release**
2. Click **Run workflow**
3. Enter the version (e.g., `v1.2.3`)
4. Click **Run workflow**

## Monitoring and Maintenance

### Performance Monitoring
- Bundle size is tracked on every PR
- Lighthouse scores are monitored weekly
- Memory usage patterns are analyzed
- Performance regressions trigger alerts

### Dependency Management
- Dependencies are updated weekly automatically
- Security vulnerabilities are scanned and reported
- Pull requests are created for safe updates

### Build Status
- Check the **Actions** tab for build status
- Green checkmarks indicate successful builds
- Red X marks indicate failures requiring attention

## Troubleshooting

### Common Issues

**Build Failures:**
- Check ESLint errors in the "Code Quality" job
- Verify TypeScript compilation in build logs
- Ensure all dependencies are properly installed

**Deployment Failures:**
- Verify Netlify secrets are configured correctly
- Check bundle size hasn't exceeded limits
- Ensure build artifacts are generated properly

**Release Failures:**
- Verify tag follows semantic versioning (`v1.2.3`)
- Check that all platforms build successfully
- Ensure GitHub token has proper permissions

### Debug Steps

1. **Check Action Logs:**
   - Go to Actions tab
   - Click on failed workflow
   - Expand failed job steps

2. **Run Locally:**
   ```bash
   npm run lint        # Check linting
   npm run build       # Test build
   npm run electron:build  # Test Electron build
   ```

3. **Security Issues:**
   ```bash
   npm audit           # Check vulnerabilities
   npm audit fix       # Fix automatically
   ```

## Customization

### Adding New Checks
Edit `.github/workflows/ci.yml` to add new jobs or steps.

### Modifying Performance Thresholds
Update performance limits in `.github/workflows/performance.yml`.

### Changing Deploy Targets
Modify deployment configuration in the ci.yml deploy jobs.

## Best Practices

1. **Keep workflows fast** - Parallel jobs where possible
2. **Cache dependencies** - npm cache is enabled
3. **Fail fast** - Early validation prevents wasted resources
4. **Secure secrets** - Never expose secrets in logs
5. **Monitor performance** - Track metrics over time
6. **Update regularly** - Keep actions and dependencies current

## Support

For issues with the CI/CD pipeline:
1. Check the troubleshooting section above
2. Review action logs for specific error messages
3. Ensure all required secrets are configured
4. Verify branch protection rules are properly set