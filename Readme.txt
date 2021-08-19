//MySQL 
//зайдіть в phpmyadmin
//створіть базу даних: 'nodemysql'
//та виконайте SQL запит/запити у базі даних nodemysql: 
//туди потрібно скопіювати цей код.
CREATE TABLE IF NOT EXISTS `users_image` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

//  http://127.0.0.1:8080
