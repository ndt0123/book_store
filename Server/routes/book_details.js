var express = require('express');
var router = express.Router();

var connect_db = require('../modules/connect_db.js');

/* GET book details */
router.get('/:id/details', function (req, res, next) {

    var book_id = req.params['id'];
    var query_book_details = "SELECT B.user_id, B.title, B.price, B.status, B.type_of_book, B.author, B.phone_number, B.position, B.describle, B.time_update, U.name, U.avatar FROM books B INNER JOIN users U on B.user_id=U.user_id WHERE B.book_id=" + book_id;
    connect_db.con.query(query_book_details, function (err_details, details) {
        if (err_details) throw err_details;

        var query_book_images = "SELECT image_path FROM book_images WHERE book_id=" + book_id;
        connect_db.con.query(query_book_images, function (err_images, images) {
            if (err_images) throw err_images;

            var query_comments = "SELECT C.comment_id, C.content, C.time_update, U.name, U.avatar FROM comment C INNER JOIN users U ON C.user_id=U.user_id WHERE C.book_id=" + book_id;
            connect_db.con.query(query_comments, function (err_comments, comments) {
                if (err_comments) throw err_comments;

                var query_comments_reply = "SELECT CR.comment_reply_id, CR.content, CR.time_update, C.comment_id, U.name, U.avatar FROM comment_reply CR INNER JOIN comment C INNER JOIN users U ON CR.comment_id=C.comment_id AND CR.user_id=U.user_id WHERE C.book_id=" + book_id;
                connect_db.con.query(query_comments_reply, function (err_comment_reply, comments_reply) {
                    if (err_comment_reply) throw err_comment_reply;

                    res.send({ details, images, comments, comments_reply });                    
                })

            })
        })
    });

});

// Lấy thông tin về nội dung và hình ảnh của sách
router.get('/book-info/:id', function (req, res, next) {

    var book_id = req.params['id'];
    var book_info;
    var book_images;

    var query_book_details = "SELECT * FROM books WHERE book_id=" + book_id;
    connect_db.con.query(query_book_details, function (err_details, details) {
        if (err_details) throw err_details;

        book_info = details[0];
        var query_book_images = "SELECT image_path FROM book_images WHERE book_id=" + book_id;
        connect_db.con.query(query_book_images, function (err_images, images) {
            if (err_images) throw err_images;
            book_images = images;

            res.send({ book_info, book_images });
        })
    });

});



router.get('/:id/recommended', function (req, res, next) {
    var book_id = req.params['id'];

    var query_book_details = "SELECT title, price, author, type_of_book FROM books WHERE book_id=" + book_id;
    connect_db.con.query(query_book_details, function (err_details, details) {
        if (err_details) throw err_details;

        var query_book_recommended = "SELECT B.book_id, B.title, B.price, B.status, BI.image_path FROM books B INNER JOIN book_images BI ON B.book_id=BI.book_id WHERE B.title='" + details[0].title + "' OR B.author='" + details[0].author + "' OR B.type_of_book='" + details[0].type_of_book + "' OR B.price > " + details[0].price * 0.9 + " AND B.price < " + details[0].price * 1.1 + " GROUP BY B.book_id";
        connect_db.con.query(query_book_recommended, function (err_recommended, recommended) {
            if (err_recommended) throw err_recommended;

            res.send(recommended);
        })
    })
})

module.exports = router;
