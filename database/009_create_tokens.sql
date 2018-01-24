CREATE TABLE `tokens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(255) NULL,
  `userId` INT NULL,
  `creationDateTime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `lastUpdateDateTime` DATETIME NULL,
  `expirationDateTime` DATETIME NULL,
  PRIMARY KEY (`id`));
