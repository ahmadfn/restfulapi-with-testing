const models = require('../src/models');

class BookService {
  static async getAllBooks() {
    try {
      return await models.Book.findAll();
    }
    catch (error) { throw new Error(error) }
  }

  static async addBook(newBook) {
    try {
      return await models.Book.create(newBook);
    }
    catch (error) { throw new Error(error) }
  }

  static async updateBook(id, updatedBook) {
    try {
      const bookToUpdate = await models.Book.findOne({
        where: { id: Number(id) }
      });

      if (bookToUpdate) {
        await models.Book.update(updatedBook, {
          where: { id: Number(id) }
        });

        return updatedBook;
      }
    }
    catch (error) { throw new Error(error) }
  }

  static async getBook(id) {
    try {
      const book = await models.Book.findOne({
        where: {  id: Number(id)}
      });

      return book;
    }
    catch (error) { throw new Error(error) }
  }

  static async deleteBook(id) {
    try {
      const book = await models.Book.findOne({
        where: { id: Number(id) }
      });

      if (book) {
        const deletedBook = await models.Book.destroy({
          where: { id: Number(id) }
        });

        return deletedBook;
      }

      return null;
    }
    catch (error) { throw new Error(error) }
  }
}

module.exports = BookService;