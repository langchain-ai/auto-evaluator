import { UseFormReturn } from "react-hook-form";

export type FormValues = {
  evalQuestionsCount: number;
  chunkSize: number;
  overlap: number;
  splitMethod: string;
  embeddingAlgorithm: string;
  model: string;
  retriever: string;
  files: any[];
};

export type Form = UseFormReturn<FormValues>;
