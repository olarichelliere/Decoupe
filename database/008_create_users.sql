CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NULL,
  `password` VARCHAR(255) NULL,
  `createdDateTime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `lastLoginDateTime` TIMESTAMP NULL,
  `divisionId` INT NOT NULL DEFAULT 0, 
  `isAdmin` INT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC));

  INSERT INTO `users` (`id`, `username`,`password`, `divisionId`, `isAdmin`) VALUES (1, 'user','$2y$10$EpsEQrCFbvNBsQcs.Hf2VeZsbsx/11N1jYl173u9WuisZ6qb2PCW2',1,0);
  INSERT INTO `users` (`id`, `username`,`password`, `divisionId`, `isAdmin`) VALUES (2, 'admin','$2y$10$ExBUI1mZFjy.yavP2e7Lh.T8TQMU/JDKL6S3BYKPD1Q6zHEyPj/X2',0,1);



