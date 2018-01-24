

CREATE TABLE `quote_detail`(
  `quote_id` int NOT NULL,
  `piece` varchar(20) NOT NULL DEFAULT '',
  `thickness_id` int NOT NULL DEFAULT 0,
  `material_id` int NOT NULL DEFAULT 0,
  `quantity` int NOT NULL DEFAULT 0,
  `nbre_defonce` int NOT NULL DEFAULT 0,
  `defonce_time` decimal(11,4) NULL DEFAULT 0,
  `feed_rate` decimal(11,4) NULL DEFAULT 0,
  `perimetre` decimal(11,4) NULL DEFAULT 0,
  `dim_x` decimal(11,2) NULL DEFAULT 0,
  `dim_y` decimal(11,2) NULL DEFAULT 0,
  `material_weight` decimal(11,2) NULL DEFAULT 0,
  `material_sf` decimal(11,2) NULL DEFAULT 0,
  `scrap` decimal(11,2) NULL DEFAULT 0,
  `material_weight_ref` decimal(11,2) NULL DEFAULT 0,
  `material_price` decimal(11,2) NULL DEFAULT 0,
  `createdDateTime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
