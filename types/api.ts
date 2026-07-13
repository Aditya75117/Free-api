export type QueryParameter = {
  key: string;
  value: string;
};

export type ApiGeneratorState = {
  keyword: string;
  generatedUrl: string;
  response: unknown | null;
  loading: boolean;
  error: string | null;
  queryParameters: QueryParameter[];
};

export type EndpointExample = {
  keyword: string;
  label: string;
  description: string;
  icon: string;
  aiPowered?: boolean;
};

export type Feature = {
  title: string;
  description: string;
  icon: string;
};
