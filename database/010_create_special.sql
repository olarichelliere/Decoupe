

CREATE TABLE `admin_data`(
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `labour_rate` decimal(11,4) NOT NULL DEFAULT 0,
  `bachmann_oh` decimal(11,4) NOT NULL DEFAULT 0,
  `scrap_pourcentage` decimal(11,4) NOT NULL DEFAULT 0,
  `createdDateTime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



INSERT INTO `admin_data` ( `id`, `labour_rate`, `scrap_pourcentage`) values
(1, 68, 18);