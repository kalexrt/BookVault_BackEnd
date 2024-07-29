export interface Book {
    id?: string,
    title?: string,
    isbn?:number,
    authors?: string[],
    genres?: string[],
    publishedDate?: Date,
    rating?: number,
    totalReviews?: number,
    totalCopies?: number,
    availableCopies?: number,
}