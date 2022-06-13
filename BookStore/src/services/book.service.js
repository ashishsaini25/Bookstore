import Book from '../models/book.model';

export const getAllBooks = async (id) => {
    const data = await Book.findOne({_id:id});
    return data;
  };