export interface User {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    age?: number;
    gender?: string;
    total_books_borrowed?: number;
    permissions?:string[];
  }
  
  export interface getUserQuery {
    q?: string;
    page?: number;
    size?: number;
  }