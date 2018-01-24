CREATE TABLE `material`(
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `description` varchar(10) NOT NULL DEFAULT '',
  `material_familly` int(11) NOT NULL DEFAULT 0,
  `multiplier` decimal(11,4) NOT NULL DEFAULT 1,
  `price_per_pound` decimal(11,4) NULL DEFAULT 0,
  `pound_per_sqfoot` decimal(11,4) NULL DEFAULT 0,
  `cutting_fee_per_pound` decimal(11,4) NULL DEFAULT 0,
  `createdDateTime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `material_familly`(
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `description` varchar(10) NOT NULL DEFAULT '',
  `createdDateTime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



INSERT INTO `material_familly` ( `id`, `description`) VALUES
(1, "SS"),
(2, "SS-Hard"),
(3, "CS"),
(4, "AL");


INSERT INTO `material` ( `id`, `description`, `material_familly`, `price_per_pound` , `pound_per_sqfoot`, `cutting_fee_per_pound`) VALUES
(1, "SS304", 1, 2, 41.42, .25),
(2, "SS316", 1, 3, 41.42, .25),
(3, "AL",    4, 5, 14.15, .50),
(4, "CS",    3, .50, 40.84, .20);
