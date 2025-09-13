
export enum Page {
  Welcome,
  Predict,
  Feedback,
}

export interface PredictionResult {
  age: number;
  confidence: number;
}

export interface ImageFile {
    base64: string;
    mimeType: string;
}
