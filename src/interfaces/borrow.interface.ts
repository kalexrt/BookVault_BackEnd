export interface getBorrowQuery {
  book?: string;
  user?: string;
  page?: number;
  size?: number;
}

export interface Borrow {
  userId: number;
  bookId: number;
}
