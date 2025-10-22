# Peptide Analysis Application

A comprehensive **React + TypeScript + Electron** application for analyzing peptide data, tissue expression, and cancer-related biomarkers. This application provides both web and desktop interfaces for interactive peptide analysis with advanced filtering, visualization, and export capabilities.

## 🧬 Features

- **Interactive Peptide Database**: Browse and analyze peptide sequences with detailed molecular information
- **Advanced Filtering**: Filter by tissue expression, cancer types, HLA binding predictions, and more
- **Data Visualizations**: Interactive charts for tissue expression, cancer correlation, and molecular properties
- **Export Capabilities**: Export filtered data in multiple formats (CSV, JSON)
- **Desktop Application**: Native desktop app with offline capabilities
- **Web Interface**: Browser-based access with full functionality
- **Real-time Search**: Fast peptide sequence search and filtering
- **Responsive Design**: Works on desktop and mobile devices

## 🏗️ Architecture

This application supports multiple deployment modes:

### 🌐 Web Application
- **Development**: Vite development server with hot reload
- **Production**: Optimized static build for web deployment
- **Preview**: Local preview of production build

### 🖥️ Desktop Application
- **Electron App**: Native desktop application for Windows, macOS, and Linux
- **Development**: Concurrent Vite + Electron with hot reload
- **Production**: Packaged installers and portable apps

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v8.x or higher
- **Git**: For cloning the repository

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KoenM-bit/peptide_analysis.git
   cd peptide_analysis
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database** (see [Database Setup](#database-setup) below)

4. **Run the application**:
   ```bash
   # Web development mode
   npm run dev

   # Electron development mode
   npm run electron:dev
   ```

## 📊 Database Setup

### ⚠️ Important: Database Files Required

This application requires peptide database files that are **NOT included in the repository** due to their size and sensitivity. You need to provide your own data files in the correct format.

### Required Files Structure

Create the following files in your project:

```
public/
├── data.json           # Main peptide database (see format below)
├── data_backup.json    # Backup of the main database
└── peptides/           # Individual peptide files directory
    ├── PEPTIDE1.json   # Individual peptide data files
    ├── PEPTIDE2.json
    └── ...
```

### Database File Formats

#### 1. Main Database (`public/data.json`)

```json
{
  "PEPTIDE_SEQUENCE": {
    "General Information": {
      "Fragment": "PEPTIDE_SEQUENCE",
      "Gene Names": "GENE1; GENE2",
      "Entries": "UNIPROT_ID1; UNIPROT_ID2",
      "Cleavage Sites": "29",
      "Gene": "GENE_NAME",
      "Gene description": "Description of the gene",
      "Molecular function": "Function1; Function2",
      "Disease involvement": "Disease information",
      "Evidence": "Evidence at protein level",
      "RNA tissue specificity": "Tissue enhanced",
      "RNA tissue distribution": "Detected in many",
      "Subcellular location": "Location",
      "Subcellular main location": "Main location",
      "TAU score - Tissue": "0.61",
      "Signal Peptide Sequence": "FULL_SIGNAL_PEPTIDE"
    },
    "Tissue Expression": {
      "Tissue RNA - adipose tissue [nTPM]": 13.0,
      "Tissue RNA - adrenal gland [nTPM]": 4.8,
      "Tissue RNA - brain [nTPM]": 25.3,
      // ... more tissue expression data
    },
    "Cancer Expression": {
      "Cancer - breast cancer [nTPM]": 15.2,
      "Cancer - lung cancer [nTPM]": 8.7,
      // ... more cancer expression data
    },
    "HLA Binding": {
      "HLA-A*01:01": 0.85,
      "HLA-A*02:01": 0.92,
      // ... more HLA binding predictions
    }
  }
  // ... more peptides
}
```

#### 2. Individual Peptide Files (`public/peptides/*.json`)

Each peptide should have its own JSON file named `{PEPTIDE_SEQUENCE}.json`:

```json
{
  "PEPTIDE_SEQUENCE": {
    // Same structure as above for this specific peptide
    "General Information": { /* ... */ },
    "Tissue Expression": { /* ... */ },
    "Cancer Expression": { /* ... */ },
    "HLA Binding": { /* ... */ }
  }
}
```

### Data Requirements

- **Peptide sequences**: Must be valid amino acid sequences
- **Tissue expression**: nTPM (normalized Transcripts Per Million) values
- **Cancer expression**: Expression levels in various cancer types
- **HLA binding**: Binding prediction scores (0-1 scale)
- **Gene information**: UniProt IDs, gene names, and descriptions

### Sample Data

For testing purposes, you can create a minimal dataset:

```json
{
  "AAAAAAAAA": {
    "General Information": {
      "Fragment": "AAAAAAAAA",
      "Gene": "TEST_GENE",
      "Gene description": "Test gene for development"
    },
    "Tissue Expression": {
      "Tissue RNA - brain [nTPM]": 25.3,
      "Tissue RNA - liver [nTPM]": 12.1
    }
  }
}
```

## 🛠️ Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start web development server |
| `npm run electron:dev` | Start Electron development mode |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run electron:build` | Build Electron application |
| `npm run lint` | Run ESLint |

### Development Workflow

1. **Web Development**:
   ```bash
   npm run dev
   # Open http://localhost:5173
   ```

2. **Desktop Development**:
   ```bash
   npm run electron:dev
   # Opens Electron window + dev server
   ```

3. **Production Testing**:
   ```bash
   npm run build
   npm run preview
   # Test production build at http://localhost:4173
   ```

### Project Structure

```
src/
├── components/           # React components
│   ├── filters/         # Filtering components
│   ├── table/          # Data table components
│   └── visualizations/ # Chart components
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── views/               # Main view components
├── electron/            # Electron main process
└── App.tsx             # Main application component
```

## 📦 Building & Distribution

### Web Application

```bash
# Build for web deployment
npm run build

# Output: dist/ directory
# Deploy contents to your web server
```

### Desktop Application

```bash
# Build for current platform
npm run electron:build

# Output: dist_electron/ directory contains:
# - macOS: .app, .dmg, .zip
# - Windows: .exe installer
# - Linux: AppImage
```

### Platform-Specific Builds

```bash
# Windows (requires Windows or cross-compilation)
npm run electron:build:win

# The build configuration supports:
# - macOS: DMG and ZIP
# - Windows: NSIS installer
# - Linux: AppImage
```

## 🧪 Testing

The application includes comprehensive filtering and visualization features:

- **Peptide Search**: Real-time search by sequence
- **Tissue Filtering**: Filter by tissue expression levels
- **Cancer Analysis**: Analyze cancer-specific expression
- **HLA Binding**: Filter by HLA allele binding predictions
- **Export Functions**: Export filtered results

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📋 Requirements

### System Requirements

- **Node.js**: 18.x or higher
- **Memory**: 4GB RAM minimum (8GB recommended for large datasets)
- **Storage**: 100MB for application + space for your database files
- **OS**: Windows 10+, macOS 10.14+, or Linux

### Browser Support (Web Version)

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Configuration

### Environment Variables

Create a `.env` file for custom configuration:

```env
# Development
VITE_API_URL=http://localhost:3000
VITE_DEBUG=true

# Production
VITE_APP_NAME="Peptide Analyzer"
```

### Electron Configuration

The Electron app is configured in `package.json` under the `build` section:

- **App ID**: `com.peptideanalyzer.app`
- **Product Name**: `Peptide Analyzer`
- **Auto-updater**: Configured for GitHub releases

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

1. **Database files not found**: Ensure `public/data.json` and `public/peptides/` exist
2. **Build failures**: Check Node.js version and run `npm install`
3. **Electron signing**: Code signing is not configured by default
4. **Memory issues**: Large datasets may require increasing Node.js memory limit

### Debug Mode

Enable debug logging:

```bash
# Web development
DEBUG=* npm run dev

# Electron development  
DEBUG=* npm run electron:dev
```

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/KoenM-bit/peptide_analysis/issues)
- **Documentation**: See inline code comments and this README
- **Email**: Contact the repository owner for data-related questions

---

**Note**: This application is designed for scientific research purposes. Ensure your data complies with relevant privacy and usage regulations.