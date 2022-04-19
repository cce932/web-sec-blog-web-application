SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+08:00";

CREATE TABLE `users` (
  `id` int(11) NOT NULL auto_increment,
  `username` varchar(64) NOT NULL,
  `password_hash` varchar(64) NOT NULL,
  `img_link` varchar(512) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `users` (`id`, `username`, `password_hash`, `img_link`) VALUES ("1", "admin", "123456", "https://lh3.googleusercontent.com/ogw/ADea4I69rbecMbB2lLleDMlm2C2vUm5y4LsRSJ4YUJYtUQ=s64-c-mo");
INSERT INTO `users` (`id`, `username`, `password_hash`, `img_link`) VALUES ("2", "nqgr", "abcdef", "https://lh3.googleusercontent.com/ogw/ADea4I69rbecMbB2lLleDMlm2C2vUm5y4LsRSJ4YUJYtUQ=s64-c-mo");
INSERT INTO `users` (`id`, `username`, `password_hash`, `img_link`) VALUES ("3", "ombz", "qazwsx", "https://lh3.googleusercontent.com/ogw/ADea4I69rbecMbB2lLleDMlm2C2vUm5y4LsRSJ4YUJYtUQ=s64-c-mo");
INSERT INTO `users` (`id`, `username`, `password_hash`, `img_link`) VALUES ("4", "dl", "$2y$10$9O6lOg34dnX1H39.gXntceYC42ocWpp/KkyS53tR/7KucmRINm4v6", "https://lh3.googleusercontent.com/ogw/ADea4I69rbecMbB2lLleDMlm2C2vUm5y4LsRSJ4YUJYtUQ=s64-c-mo");
INSERT INTO `users` (`id`, `username`, `password_hash`, `img_link`) VALUES ("5", "fdsfa", "tgbyhn", "https://lh3.googleusercontent.com/ogw/ADea4I69rbecMbB2lLleDMlm2C2vUm5y4LsRSJ4YUJYtUQ=s64-c-mo");
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`id`, `username`, `password`) VALUES ("1", "admin", "123456");
INSERT INTO `users` (`id`, `username`, `password`) VALUES ("2", "nqgr", "abcdef");
INSERT INTO `users` (`id`, `username`, `password`) VALUES ("3", "ombz", "qazwsx");
INSERT INTO `users` (`id`, `username`, `password`) VALUES ("4", "pgid", "edcrfv");
INSERT INTO `users` (`id`, `username`, `password`) VALUES ("5", "fsfw", "tgbyhn");