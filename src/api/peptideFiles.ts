export async function getPeptideFiles(): Promise<string[]> {
  const response = await fetch('/api/peptide-files');
  if (!response.ok) {
    throw new Error('Failed to fetch peptide file list');
  }
  return response.json();
}