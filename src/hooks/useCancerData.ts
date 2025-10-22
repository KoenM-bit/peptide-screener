import { useMemo } from 'react';
import { ProcessedCancerData } from '../types/CancerTypes';

export function useCancerData(data: Record<string, unknown>) {
  return useMemo(() => {
    const processedData: ProcessedCancerData[] = Object.entries(data).map(([name, value]) => ({
      name: name.split(' ').length > 3 
        ? name.split(' ').slice(0, 3).join(' ') + '...'
        : name,
      fullName: name,
      tcgaMedian: value.TCGA?.Median ?? 0,
      tcgaStdDev: value.TCGA?.StdDev ?? 0,
      tcgaSamples: value.TCGA?.Samples ?? 0,
      validationMedian: value.validation?.Median,
      validationStdDev: value.validation?.StdDev,
      validationSamples: value.validation?.Samples
    }));

    // Calculate max value for y-axis (including error bars)
    const maxValue = Math.max(
      ...processedData.flatMap(d => [
        d.tcgaMedian + d.tcgaStdDev,
        d.validationMedian ? d.validationMedian + (d.validationStdDev ?? 0) : 0
      ])
    );

    // Round up to nearest 10
    const roundedMax = Math.ceil(maxValue / 10) * 10;

    return {
      processedData: processedData.sort((a, b) => b.tcgaMedian - a.tcgaMedian),
      maxValue: roundedMax
    };
  }, [data]);
}