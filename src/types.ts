export interface IItemStore {
  readonly id?: string;
  readonly owner?: string;
  name: string;
  description?: string;
  snippet?: string;
  extent?: number[][];
  culture?: string;
  properties?: any;
  url?: string;
  tags?: string[];
  typeKeywords?: string[];
  readonly created?: number;
  readonly modified?: number;

  create<T>(options: Partial<T>): Promise<T>;
  destroy(id: string): Promise<void>;
  update<T>(options: T): Promise<T>;
}
