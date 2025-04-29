async function show(req, res) {
  try {
    await req.user.populate({
      path: 'booksRead',
      select: 'title author',
      populate: {
        path: 'author',
        model: 'Author',
        select: 'firstName middleName lastName'
      }
    });

    // Sort books by title
    req.user.booksRead.sort((a, b) => a.title.localeCompare(b.title));

    console.log('User books after population:', req.user.booksRead.map(book => ({
      id: book._id,
      title: book.title
    })));

    res.render('users/show', {
      title: `${req.user.username}'s Books`,
      user: req.user,
    });
  } catch (err) {
    console.error('Error in show function:', err);
    res.render('error', { title: 'Something Went Wrong' });
  }
}

async function add(req, res) {
  try {
    const user = req.user;
    const bookId = req.params.id;
    
    if (user.booksRead.indexOf(bookId) === -1) {
      user.booksRead.push(bookId);
      await user.save();
    }

    // If it's an AJAX request, send JSON response
    if (req.headers['content-type'] === 'application/json') {
      return res.json({ success: true });
    }
    // Otherwise, redirect as usual
    res.redirect('back');
  } catch (error) {
    console.error('Error adding book:', error);
    // If it's an AJAX request, send JSON response
    if (req.headers['content-type'] === 'application/json') {
      return res.status(500).json({ error: 'Failed to add book' });
    }
    res.render('error', { title: 'Something Went Wrong' });
  }
}

async function deleteBook(req, res) {
  try {
    const bookId = req.params.id;
    const bookIndex = req.user.booksRead.findIndex(id => id.toString() === bookId.toString());
    
    if (bookIndex === -1) {
      const error = 'Book not found in user\'s collection';
      // If it's an AJAX request, send JSON response
      if (req.headers['content-type'] === 'application/json') {
        return res.status(404).json({ error });
      }
      return res.redirect('back');
    }
    
    req.user.booksRead.splice(bookIndex, 1);
    await req.user.save();

    // If it's an AJAX request, send JSON response
    if (req.headers['content-type'] === 'application/json') {
      return res.json({ success: true });
    }
    // Otherwise, redirect as usual
    res.redirect('back');
  } catch (error) {
    console.error('Error deleting book:', error);
    // If it's an AJAX request, send JSON response
    if (req.headers['content-type'] === 'application/json') {
      return res.status(500).json({ error: 'Failed to delete book' });
    }
    res.render('error', { title: 'Something Went Wrong' });
  }
}

module.exports = {
  show,
  add,
  delete: deleteBook,
};
