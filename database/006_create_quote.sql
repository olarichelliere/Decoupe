

CREATE TABLE `quote`(
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `division_id` int NOT NULL DEFAULT 0,
  `createdDateTime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
