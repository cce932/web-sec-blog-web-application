SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+08:00";

CREATE TABLE `users` (
  `id` int(11) NOT NULL auto_increment,
  `username` varchar(64) NOT NULL,
  `password_hash` varchar(64) NOT NULL,
  `img_link` varchar(512) NOT NULL,
  `role` varchar(32) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `users` (`id`, `username`, `password_hash`, `img_link`, `role`) VALUES ("1", "admin", "$2y$10$SkfH2doi0pvq60sx9D/jWO/zn4bU.ZJgW3BHQVowJbI8epK6A5qWe", "https://memegenerator.net/img/instances/59660050.jpg", "admin");
INSERT INTO `users` (`id`, `username`, `password_hash`, `img_link`, `role`) VALUES ("2", "dd", "$2y$10$9O6lOg34dnX1H39.gXntceYC42ocWpp/KkyS53tR/7KucmRINm4v6", "https://lh3.googleusercontent.com/ogw/ADea4I69rbecMbB2lLleDMlm2C2vUm5y4LsRSJ4YUJYtUQ=s64-c-mo", "member");

CREATE TABLE `messages` (
  `id` int(11) NOT NULL auto_increment,
  `message` varchar(256) NOT NULL,
  `username` varchar(64) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_time` datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `messages` (`id`, `username`, `message`, `user_id`, `created_time`) VALUES ("1", "dl", "test message dl 1", "4", "2022-04-19 02:02:34");
INSERT INTO `messages` (`id`, `username`, `message`, `user_id`, `created_time`) VALUES ("2", "dl", "test message dl 2", "4", "2022-04-19 04:02:44");


CREATE TABLE `files` (
  `id` int unsigned COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` blob NOT NULL,
  `saved_date` datetime NOT NULL,
  `message_id` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `website_config` (
  `item` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`item`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `website_config` (`item`, `value`) VALUES ("title", "DENA'S WEBSITE");