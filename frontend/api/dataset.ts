import type { AxiosInstance } from "axios";

export type DatasetParams = {
  plant_height: number;
  chlorophyll_percent: number;
  true_leaves_count: number;
  node_count: number;
  side_shoots_count: number;
  reproduction_coefficient: number;
};

export type DatasetFull = {
  [key: string]: number;
} & DatasetParams;

export type CreateDatasetEntryInput = {
  medium_id: number;
} & DatasetParams


export type AnalyzerFigureResult = {
  figure: string;
  mse?: string;
  r2?: string;
  coefficients: Record<string, number>,

}

export type AnalyzerResponse = {
  corr_matrix: string;
  linear_regression: {
    graphs:string[];
    summary: string;
  },
  neural_net: AnalyzerFigureResult,
  decision_tree: AnalyzerFigureResult,
  knn: AnalyzerFigureResult,
  random_forest: AnalyzerFigureResult,
  lasso: AnalyzerFigureResult,
  ridge: AnalyzerFigureResult,
}

export class Dataset {
  instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  analyze(payload: {param:keyof DatasetParams}) {
    return this.instance.get<AnalyzerResponse>(`/analyze?param=${payload.param}`, )
  }

  getDataset() {
    return this.instance.get<DatasetFull[]>("/dataset");
  }

  importDataset(file: File) {
    const formData = new FormData();
    formData.append("dataset", file);
    return this.instance.post<DatasetFull[]>("/dataset/import", formData);
  }
  createEntry(dataset: CreateDatasetEntryInput) {
    return this.instance.post<DatasetFull[]>("/dataset", [dataset]);
  }
}
