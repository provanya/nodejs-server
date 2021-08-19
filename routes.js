const sharp = require('sharp');
exports.index = function (req, res) {
  message = '';
  if (req.method == 'POST') {
    var post = req.body;
    var fname = post.first_name;
    var lname = post.last_name;
    var email = post.email;

    if (req.files.uploaded_image == undefined)
      return res
        .status(400)
        .send(
          'Ви не завантажили фото, будьласка поверніться назад і завантажте своє фото.'
        );

    var file = req.files.uploaded_image;
    var img_name = file.name;

    var oldFile = './public/images/upload_images/' + file.name;

    if (
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/gif'
    ) {
      file.mv('public/images/upload_images/' + file.name, function (err) {
        sharp('./public/images/upload_images/' + file.name)
          .resize(200, 200)
          .toFile('./public/images/upload_images/o' + file.name);

        if (err) return res.status(500).send(err);
        var sql =
          "INSERT INTO `users_image`(`first_name`,`last_name`,`email`,`image`) VALUES ('" +
          fname +
          "','" +
          lname +
          "','" +
          email +
          "','o" +
          img_name +
          "')";

        var query = db.query(sql, function (err, result) {
          res.redirect('profile/' + result.insertId);
        });
      });
    } else {
      message =
        "Цей формат не підтримується , будьласка завантажте файл з розширенням '.png','.gif','.jpg'";
      res.render('index.ejs', { message: message });
    }
  } else {
    res.render('index');
  }
};

exports.profile = function (req, res) {
  var message = '';
  var id = req.params.id;
  var sql = "SELECT * FROM `users_image` WHERE `id`='" + id + "'";
  db.query(sql, function (err, result) {
    if (result.length <= 0) message = 'Профіль не знайдено!';

    res.render('profile.ejs', { data: result, message: message });
  });
};
