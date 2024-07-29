export interface Book {
  id?: string;
  title?: string;
  isbn?: number;
  authors?: string[];
  genres?: string[];
  publishedDate?: Date;
  rating?: number;
  totalReviews?: number;
  totalCopies?: number;
  availableCopies?: number;
}

export interface getBookQuery {
  title?: string;
  genre?: string;
  isbn?: string;
  author?: string;
  page?: number;
  size?: number;
}
