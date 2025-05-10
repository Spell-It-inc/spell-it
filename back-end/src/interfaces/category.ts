export interface Category {
  category_id: number;
  name: string;
  description: string;
}

export interface CategoryWords {
  category_id: number;
  name: string;
  words: Array<{ word_id: number; word: string }>;
  pagination: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
