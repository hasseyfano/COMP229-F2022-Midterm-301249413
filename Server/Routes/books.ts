/** Name: Yahya Ibrahim
 * StudentID: 301003971
 * Web Application Development
 * COMP229-M2022-MidtermTest
 */



// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

   
    res.render('books/details', {title: 'Add', page: 'details', books: ''}) 
     

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
    
    
   let newBook = new book
   ({
    "Title": req.body.bookTitle,
    "Price": req.body.bookPrice,
    "Author": req.body.bookAuthor,
    "Genre": req.body.bookGenre
   });

   // Insert the new book object into the db 
   book.create(newBook, function(err)
   {
    if(err)
    {
        console.error(err);
        res.end(err);
    }

    // new book has been added 
    res.redirect('/books');

   })
     
     

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

   
     let id = req.params.id;

     // pass the id to the db and read the book into the edit page
     book.findById(id, {}, {}, function(err, bookToEdit)
     {
         if(err)
         {
             console.error(err);
             res.end(err);
         }
 
         // show the edit view with the data
         res.render('books/details', {title: 'Edit', page: 'edit', books: bookToEdit})
        
 
     })
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    
     let id = req.params.id;

    // instantiate a new book to Edit
   let updatedBook = new book
   ({
     "_id": id,     
     "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
     
   });

   // update the book in the db
   book.updateOne({_id: id}, updatedBook, function(err: ErrorCallback)
   {
    if(err)
    {
        console.error(err);
        res.end(err);
    }

    // edit was successful 
    res.redirect('/books');
   });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
    
     let id = req.params.id;

     // pass the id to the db and delete the book
     book.remove({_id: id}, function(err)
     {
         if(err)
         {
             console.error(err);
             res.end(err);
         }
 
         // delete was successful
         res.redirect('/books');
 
     });
});


//module.exports = router;
