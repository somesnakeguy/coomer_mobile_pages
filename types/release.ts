// types/release.ts
export interface ReleaseEntry {
  version: string;
  date: string;
  summary: string;
  notes: string[];
}

export interface CurrentRelease {
  version: string;
  releaseSummary: string;
  releaseNotes: string[];
  apkUrl: string;
  releaseDate: string;
}

export interface ReleaseData {
  current: CurrentRelease;
  changelog: ReleaseEntry[];
}