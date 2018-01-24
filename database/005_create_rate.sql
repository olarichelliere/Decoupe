

CREATE TABLE `rate_data`(
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `material_id` int NOT NULL DEFAULT 0,
  `thickness_id` int NOT NULL DEFAULT 0,
  `feed_rate` decimal(11,4) NOT NULL DEFAULT 0,
  `defonce` decimal(11,4) NOT NULL DEFAULT 0,
  `createdDateTime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



INSERT INTO `rate_data` ( `id`, `material_id` , `thickness_id`, `feed_rate`, `defonce`) values
(1, 1,1,200,.05);