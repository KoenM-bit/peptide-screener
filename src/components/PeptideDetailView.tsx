// Update PeptideDetailView to include cancer expression
import React from 'react';
import { TissueExpressionHeatmap } from './visualizations/TissueExpressionHeatmap';
import { CancerExpressionChart } from './visualizations/CancerExpressionChart';
import { BasicInfo } from './peptide-sections/BasicInfo';
import { FunctionInfo } from './peptide-sections/FunctionInfo';
import { LocationInfo } from './peptide-sections/LocationInfo';
import { ExpressionInfo } from './peptide-sections/ExpressionInfo';
import { HLABindingPanel } from './visualizations/HLABindingPanel';
import { FlatPeptideData } from '../types/PeptideData';
import { processBindingData } from '../utils/hlaUtils';

interface PeptideDetailViewProps {
  data: FlatPeptideData;
}

export function PeptideDetailView({ data }: PeptideDetailViewProps) {
  const bindingData = processBindingData(data['Peptide Binding'] || {});

  return (
    <div className="space-y-6">
      <BasicInfo
        fragment={data.fragment}
        gene={data.Gene}
        geneDescription={data['Gene description']}
        evidence={data.Evidence}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FunctionInfo
          biologicalProcess={data['Biological process'] || 'NA'}
          molecularFunction={data['Molecular function']}
          diseaseInvolvement={data['Disease involvement']}
        />
        
        <LocationInfo
          subcellularLocation={data['Subcellular location']}
          subcellularMainLocation={data['Subcellular main location']}
        />
      </div>

      <ExpressionInfo
        tissueSpecificity={data['RNA tissue specificity']}
        tissueDistribution={data['RNA tissue distribution']}
        specificityScore={data['RNA tissue specificity score']}
        tauScore={parseFloat(data['TAU score - Tissue'])}
      />

      <CancerExpressionChart data={data.cancerExpression} />

      <HLABindingPanel data={bindingData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TissueExpressionHeatmap 
          title="Tissue Expression"
          data={data.tissueExpression} 
        />
        <TissueExpressionHeatmap 
          title="Single Cell Expression"
          data={data.singleCellExpression}
        />
      </div>
    </div>
  );
}