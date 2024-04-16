type ApiResponse<T> = {
  data: T | null;
  message?: string | null;
  error: string | null;
};

export default ApiResponse;