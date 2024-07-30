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
    const bookId = await this.queryBuilder()
      .insert(bookToCreate)
      .table("books")
      .returning("id");

    for (const author of book.authors) {
      let authorId;
      const existingAuthor = await this.queryBuilder()
        .select("id")
        .from("authors")
        .where({ name: author })
        .first();
      if (existingAuthor) {
        authorId = existingAuthor.id;
      } else {
        const newAuthor = await this.queryBuilder()
          .insert({ name: author })
          .into("authors")
          .returning("id");
        authorId = newAuthor[0];
      }
      await this.queryBuilder()
        .insert({ book_id: bookId[0].id, author_id: authorId.id })
        .into("books_authors");
    }

    for (const genre of book.genres) {
      let genreId;
      const existingGenre = await this.queryBuilder()
        .select("id")
        .from("genres")
        .where({ name: genre })
        .first();
      if (existingGenre) {
        genreId = existingGenre.id;
      } else {
        const newGenre = await this.queryBuilder()
          .insert({ name: genre })
          .into("genres")
          .returning("id");
        genreId = newGenre[0];
      }
      await this.queryBuilder()
        .insert({ book_id: bookId[0].id, genre_id: genreId.id })
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
