CREATE TABLE `division`(
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`division` varchar(30) NULL DEFAULT '',
	`div_address` varchar(30) NULL DEFAULT '',
	`city` varchar(30) NULL DEFAULT '',
  `province` varchar(30) NULL DEFAULT '',
	`postal` varchar(30) NULL DEFAULT '',
	`manager` varchar(30) NULL DEFAULT '',
	`tel` varchar(30) NULL DEFAULT '',
	`email` varchar(50) NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `division` ( `id`, `division` , `div_address`, `city`, `province`, `postal`,`manager`,`tel`,`email`) values
(1, "Industrie Lemieux","1401 Rue Graham-Bell","Boucherville","Quebec","J4B 6A1", "Eric Smith","450-441-4490","eric.smits@indlemieux.com"),
(2, "Drummond Welding","700 Rue Talon","Longueuil","Quebec","J4G 1P7","Marc Bouchard","514-526-4411","mbouchard@dwsw.ca"),
(3, "Paprima","75 Avenue Guthrie","Dorval","Quebec","H9P 2P1","Alain Verville","514-422-9555","Alain.Verville@paprima.ca"),
(4, "Mitchell Industrial","350 Boul. Decarie","Ville St-Laurent","Quebec","H4L 0B4","Richard Belanger","514-747-2471","richard.belanger@robertmitchell.com"),
(5, "Mitchell Aerospace","350 Boul. Decarie","Ville St-Laurent","Quebec","H4L 0B4","Denis Matte","514-747-","denis.matte@mitchellaerospace.com"),
(6, "Bachmann","1460 Rue Michelin","Laval","Quebec","H7L 4R3","Mike Goard","450-786-8686","mgoard@bachmann.ca"),
(7, "Douglas Barwick","599 Cure-Boivin","Boisbriand","Quebec","J4Z 2T5","Alain Laberge","450-435-3643","a.laberge@dblaval.com"),
(8, "Douglas Brothers","423 Riverside Industrial Pkwy","Portland","Maine","04103","Bill Mc","207-797-6771","billmdbi@gmail.com"),
(9, "Formweld","8118 Progress Dr.","Milton","Florida","32583","Keven D","850-626-4888","kevin@formweldfitting.com"),
(10, "Savico","780 Boul. Gilles Villeneuve","Berthierville","Quebec","J0K 1A0","Pierre Giguere","450-836-6279","pgiguere@savico.com"),
(11, "Rodrigue","1890 1re Rue","St-Romuald","Quebec","G6W 5M6","Daniel Beaupre","418-839-0671","Daniel.Beaupre@rodriguemetal.com"),
(12, "LMW","2030 Industrial Dr.","Bathurst","New Brunswick","E2A 4W7","Chris Pitre","506-548-4479","cpitre@labmw.ca"),
(13, "Marshall","Airport Rd","Labrador City","NL","A2V 2X9","Paul Moss","709-944-5515","moss@marshallind.ca");
