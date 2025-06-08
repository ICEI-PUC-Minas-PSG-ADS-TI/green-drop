/* --------------------------------------------------
   Tabela: users
   -------------------------------------------------- */
CREATE TABLE `users` (
  `id`            INT(10)       NOT NULL AUTO_INCREMENT,
  `name`          VARCHAR(100)  NOT NULL,
  `email`         VARCHAR(100)  NOT NULL,
  `password_hash` VARCHAR(255)  NOT NULL,
  `phone`         VARCHAR(14)   NOT NULL,
  `photo_url`     VARCHAR(150)  NULL,
  `role`          VARCHAR(9)    NOT NULL,
  `created_at`    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`email`),
  UNIQUE KEY (`password_hash`),
  UNIQUE KEY (`phone`),
  UNIQUE KEY (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/* --------------------------------------------------
   Tabela: achievements
   -------------------------------------------------- */
CREATE TABLE `achievements` (
  `id`          INT(10)      NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(100) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/* --------------------------------------------------
   Tabela: quests
   -------------------------------------------------- */
CREATE TABLE `quests` (
  `id`          INT(10)      NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(100) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/* --------------------------------------------------
   Tabela: achievements_progress
   -------------------------------------------------- */
CREATE TABLE `achievements_progress` (
  `id`                   INT(10)      NOT NULL AUTO_INCREMENT,
  `achievementsid`       INT(10)      NOT NULL,
  `usersid`              INT(10)      NOT NULL,
  `completed_challenges` INT(10)      NULL,
  `status`               INT(20)      NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ap_achievements` (`achievementsid`),
  KEY `fk_ap_users`        (`usersid`),
  CONSTRAINT `fk_ap_achievements`
    FOREIGN KEY (`achievementsid`) REFERENCES `achievements` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ap_users`
    FOREIGN KEY (`usersid`) REFERENCES `users` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/* --------------------------------------------------
   Tabela: achievements_quests
   -------------------------------------------------- */
CREATE TABLE `achievements_quests` (
  `achievementsid` INT(10) NOT NULL,
  `questsid`       INT(10) NOT NULL,
  `goal`           INT(10) NOT NULL,
  KEY `fk_aq_achievements` (`achievementsid`),
  KEY `fk_aq_quests`       (`questsid`),
  CONSTRAINT `fk_aq_achievements`
    FOREIGN KEY (`achievementsid`) REFERENCES `achievements` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_aq_quests`
    FOREIGN KEY (`questsid`) REFERENCES `quests` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/* --------------------------------------------------
   Tabela: quests_progress
   -------------------------------------------------- */
CREATE TABLE `quests_progress` (
  `id`       INT(10)      NOT NULL AUTO_INCREMENT,
  `questsid` INT(10)      NOT NULL,
  `usersid`  INT(10)      NOT NULL,
  `progress` INT(10)      NOT NULL,
  `status`   VARCHAR(20)  NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_qp_quests` (`questsid`),
  KEY `fk_qp_users`  (`usersid`),
  CONSTRAINT `fk_qp_quests`
    FOREIGN KEY (`questsid`) REFERENCES `quests` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_qp_users`
    FOREIGN KEY (`usersid`) REFERENCES `users` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/* --------------------------------------------------
   Tabela: reports
   -------------------------------------------------- */
CREATE TABLE `reports` (
  `id`            INT(10)         NOT NULL AUTO_INCREMENT,
  `usersid`       INT(10)         NOT NULL,
  `description`   VARCHAR(255)    NOT NULL,
  `photo_url`     VARCHAR(255)    NOT NULL,
  `status`        VARCHAR(20)     NOT NULL,
  `created_at`    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `validated_at`  TIMESTAMP       NULL,
  `longitude`     DECIMAL(10,10)  NOT NULL,
  `latitude`      DECIMAL(10,10)  NOT NULL,
  `category`      INT(10)         NOT NULL,
  `problem_type`  INT(10)         NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reports_users` (`usersid`),
  CONSTRAINT `fk_reports_users`
    FOREIGN KEY (`usersid`) REFERENCES `users` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
