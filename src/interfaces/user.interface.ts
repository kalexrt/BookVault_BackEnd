export interface User {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    age?: number;
    gender?: string;
    roles?:string[];
  }
  
  export interface getUserQuery {
    q?: string;
    page?: number;
    size?: number;
  }