const BookService = require('../services/BookService');

const Util = require('../utils/Utils');

const util = new Util();

class BookController {
  static async getAllBooks(req, res) {
    try {
      const allBooks = await BookService.getAllBooks();

      if (allBooks.length > 0) {
        util.setSuccess(200, 'Books retrieved', allBooks);
      } else {
        util.setSuccess(200, 'No book found');
      }

      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addBook(req, res) {
    if (!req.body.title || !req.body.price || !req.body.description) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }

    const newBook = req.body;

    try {
      const createdBook = await BookService.addBook(newBook);
      util.setSuccess(201, 'Book Added!', createdBook);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateBook(req, res) {
    const alteredBook = req.body;
    const {
      id
    } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const updatedBook = await BookService.updateBook(id, alteredBook);

      if (!updatedBook) {
        util.setError(404, `Cannot find book with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Book updated', updatedBook);
      }

      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getBook(req, res) {
    const {
      id
    } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const book = await BookService.getBook(id);

      if (!book) {
        util.setError(404, `Cannot find book with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found book', book);
      }

      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteBook(req, res) {
    const {
      id
    } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const book = await BookService.deleteBook(id);

      if (book) {
        util.setSuccess(200, 'Book is deleted');
      } else {
        util.setError(404, `Book with id ${id} cannot be found`);
      }

      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

}

module.exports = BookController;
//# sourceMappingURL=BookController.js.map