// fileLoader.ts
import { PeptideData } from '../types/PeptideData';

export async function loadJsonFile<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load file: ${path} (${response.status})`);
  }
  return response.json();
}

export async function loadPeptideFile(
  filename: string
): Promise<Record<string, PeptideData>> {
  try {
    const peptideId = filename.replace('.json', '');

    // Try multiple potential locations in order of likelihood
    const pathsToTry = [
      `/peptides/${filename}`, // Standard dev path
      `./peptides/${filename}`, // Working path from logs
      `../peptides/${filename}`, // One level up
      `../../peptides/${filename}`, // Two levels up
      `./resources/peptides/${filename}`, // Resources folder
      `../resources/peptides/${filename}`, // Resources one level up
    ];

    // Try each path in order
    for (const path of pathsToTry) {
      try {
        console.log(`Attempting to load from: ${path}`);
        const response = await fetch(path);
        if (response.ok) {
          const jsonData = await response.json();
          console.log(
            `Successfully loaded peptide from: ${path}, keys:`,
            Object.keys(jsonData).join(', ')
          );

          // Check if the data has the correct structure
          if (jsonData[peptideId]) {
            console.log(
              `Found expected peptide data structure for ${peptideId}`
            );
            return jsonData; // Return as is, since it's already in {peptideId: data} format
          } else {
            console.log(
              `Did not find expected structure for ${peptideId}, wrapping data`
            );
            return { [peptideId]: jsonData }; // Wrap it with the peptideId
          }
        }
      } catch {
        // Just try the next path
      }
    }

    console.error(`Failed to load peptide file ${filename} from any location`);
    return {};
  } catch (error) {
    console.error(`Failed to load peptide file ${filename}:`, error);
    return {};
  }
}
