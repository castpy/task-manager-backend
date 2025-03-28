export interface Filter {
  work?: string;
  location?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
