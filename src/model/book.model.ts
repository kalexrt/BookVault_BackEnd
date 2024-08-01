import { Book, getBookQuery } from "../interfaces/book.interface";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./Base.model";

const logger = loggerWithNameSpace("BookModel");
export class BookModel extends BaseModel {

  //create book
  static async createBook(book: Book, imageUrl: string, createdBy: string) {
    logger.info("Called createBook");
    const bookToCreate = {
      title: book.title,
      isbn: book.isbn,
      published_date: book.publishedDate,
      total_copies: book.totalCopies,
      available_copies: book.totalCopies,
      created_by: createdBy,
      image_link: imageUrl,
    };
    //insert base book
    const bookId = await this.queryBuilder()
      .insert(bookToCreate)
      .table("books")
      .returning("id");

    //insert authors
    for (const author of book.authors) {
      let authorId;
      const existingAuthor = await this.queryBuilder()
        .select("id")
        .from("authors")
        .where({ name: author })
        .first();
      if (existingAuthor) { //check if author exists
        authorId = existingAuthor.id;
      } else {
        const newAuthor = await this.queryBuilder() //create if author does not exists
          .insert({ name: author })
          .into("authors")
          .returning("id");
        authorId = newAuthor[0].id;
      }
      await this.queryBuilder()
        .insert({ book_id: bookId[0].id, author_id: authorId}) //insert into books_authors
        .into("books_authors");
    }

   //insert genres
    for (const genre of book.genres) {
      let genreId;
      const existingGenre = await this.queryBuilder()
        .select("id")
        .from("genres")
        .where({ name: genre })
        .first();

      if (existingGenre) { //check if genre exists
        genreId = existingGenre.id;
      } else {
        const newGenre = await this.queryBuilder() //create if genre does not exists
          .insert({ name: genre })
          .into("genres")
          .returning("id");
        genreId = newGenre[0].id; // Access the id property of the returned object
      }
      await this.queryBuilder()
        .insert({ book_id: bookId[0].id, genre_id: genreId }) //insert into books_genres
        .into("books_genres");
    }
  }

  //get book by id
  static async getBookById(id: string) {
    return await this.queryBuilder()
      .select(
        "books.*",
        this.queryBuilder().raw("array_agg(distinct authors.name) as authors"),
        this.queryBuilder().raw("array_agg(distinct genres.name) as genres")
      )
      .from("books")
      .leftJoin("books_authors", "books.id", "books_authors.book_id")
      .leftJoin("authors", "authors.id", "books_authors.author_id")
      .leftJoin("books_genres", "books.id", "books_genres.book_id")
      .leftJoin("genres", "genres.id", "books_genres.genre_id")
      .where("books.id", id)
      .groupBy("books.id")
      .first();
  }

  //update book by id
  static async updateBookById(id: string, book: Book, updatedBy: string) {
    logger.info("Called updateBookById");
    const bookToUpdate = {
      title: book.title,
      isbn: book.isbn,
      published_date: book.publishedDate,
      rating: book.rating,
      total_reviews: book.totalReviews,
      total_copies: book.totalCopies,
      available_copies: book.availableCopies,
      updated_at: new Date(),
      updated_by: updatedBy
    }
    await this.queryBuilder().update(bookToUpdate).table("books").where({ id });

    // Update authors
    await this.queryBuilder().delete().from("books_authors").where({ book_id: id });
    for (const author of book.authors) {
      let authorId;
      const existingAuthor = await this.queryBuilder()
        .select("id")
        .from("authors")
        .where({ name: author })
        .first();
      if (existingAuthor) { // Check if author exists
        authorId = existingAuthor.id;
      } else {
        const newAuthor = await this.queryBuilder() // Create if author does not exist
          .insert({ name: author })
          .into("authors")
          .returning("id");
        authorId = newAuthor[0].id;
      }
      await this.queryBuilder()
        .insert({ book_id: id, author_id: authorId }) // Insert into books_authors
        .into("books_authors");
    }
    // Update genres
    await this.queryBuilder().delete().from("books_genres").where({ book_id: id });
    for (const genre of book.genres) {
      let genreId;
      const existingGenre = await this.queryBuilder()
        .select("id")
        .from("genres")
        .where({ name: genre })
        .first();
      if (existingGenre) { // Check if genre exists
        genreId = existingGenre.id;
      } else {
        const newGenre = await this.queryBuilder() // Create if genre does not exist
          .insert({ name: genre })
          .into("genres")
          .returning("id");
        genreId = newGenre[0].id;
      }
      await this.queryBuilder()
        .insert({ book_id: id, genre_id: genreId }) // Insert into books_genres
        .into("books_genres");
    }
  }

  //delete book by id
  static async deleteBookById(id: string) {
    await this.queryBuilder().from("books").where({ id }).del();
  }

  //get books
  static getBooks(filter: getBookQuery) {
    const { title, genre, isbn, author, page = 1, size = 16 } = filter;
    const query = this.queryBuilder()
      .select(
        "books.*",
        this.queryBuilder().raw("array_agg(distinct authors.name) as authors"),
        this.queryBuilder().raw("array_agg(distinct genres.name) as genres")
      )
      .from("books")
      .leftJoin("books_authors", "books.id", "books_authors.book_id")
      .leftJoin("authors", "authors.id", "books_authors.author_id")
      .leftJoin("books_genres", "books.id", "books_genres.book_id")
      .leftJoin("genres", "genres.id", "books_genres.genre_id")
      .groupBy("books.id")
      .limit(size!)
      .offset((page! - 1) * size!);

    if (title) {
      query.where("books.title", "like", `%${title}%`);
    }
    if (isbn) {
      query.where("books.isbn", "like", `%${isbn}%`);
    }
    if (author) {
      query.where("authors.name", "like", `%${author}%`);
    }
    if (genre) {
      query.where("genres.name", "like", `%${genre}%`);
    }

    return query;
  }

  //count books
  static count(filter: getBookQuery) {
    const { title, genre, isbn, author } = filter;
    const query = this.queryBuilder()
    .countDistinct("books.id as count")
    .from("books")
    .leftJoin("books_authors", "books.id", "books_authors.book_id")
    .leftJoin("authors", "authors.id", "books_authors.author_id")
    .leftJoin("books_genres", "books.id", "books_genres.book_id")
    .leftJoin("genres", "genres.id", "books_genres.genre_id");

    if (title) {
      query.where("books.title", "like", `%${title}%`);
    }
    if (isbn) {
      query.where("books.isbn", "like", `%${isbn}%`);
    }
    if (author) {
      query.where("authors.name", "like", `%${author}%`);
    }
    if (genre) {
      query.where("genres.name", "like", `%${genre}%`);
    }
    return query.first();
  }
}
