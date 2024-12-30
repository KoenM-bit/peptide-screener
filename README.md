# TEIPP Peptide Analyzer

A web application for analyzing and visualizing TEIPP peptide data, including tissue expression, cancer expression, and HLA binding profiles.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/peptide-analysis-app.git
cd peptide-analysis-app
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── filters/        # Filter components
│   ├── modals/         # Modal components
│   ├── navigation/     # Navigation components
│   ├── peptide-sections/ # Peptide detail sections
│   ├── table/          # Table components
│   └── visualizations/ # Data visualization components
├── db/                 # Database and storage utilities
├── hooks/              # React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── views/              # Page components
```

## Data Format

The application expects a `data.json` file in the `public` directory with the following structure:

```json
{
  "peptide_fragment": {
    "General Information": {
      "Gene": "string",
      "Gene description": "string",
      "Evidence": "string",
      "RNA tissue specificity": "string",
      "RNA tissue distribution": "string",
      "RNA tissue specificity score": "string",
      "TAU score - Tissue": "string",
      "Signal Peptide Sequence": "string",
      "Subcellular location": "string",
      "Subcellular main location": "string"
    },
    "Peptide Binding": {
      "HLA-A*01:01": number,
      "HLA-A*02:01": number
    },
    "Tissue Expression": {
      "tissue_name": number
    },
    "Single Cell Expression": {
      "cell_type": number
    },
    "Cancer Expression": {
      "TCGA_cancer_type": number
    }
  }
}
```

## Features

- Interactive peptide data table with sorting and filtering
- Detailed peptide information view
- Expression profile visualization
- HLA binding analysis
- Cancer expression analysis
- Data export functionality
- Persistent storage for liked peptides

## Dependencies

Main dependencies:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Recharts (for data visualization)
- Lucide React (for icons)
- IndexedDB (for client-side storage)
- React Table
- PapaParse (for CSV parsing)

## Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License