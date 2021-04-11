CREATE TABLE `products` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`description` TEXT,
	`image` varchar(255) UNIQUE,
	`category_id` INT NOT NULL,
	`quantity` numeric NOT NULL DEFAULT '0',
	`price` FLOAT NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`date` DATE NOT NULL,
	`address_id` INT NOT NULL,
	`phone` numeric(15) NOT NULL UNIQUE,
	`avatar` varchar(255) NOT NULL UNIQUE,
	`email` varchar(255) NOT NULL UNIQUE,
	`password_hash` varchar(255) NOT NULL,
	`role_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `role` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `cart` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`users_id` INT NOT NULL,
	`product_id` INT NOT NULL,
	`quantity` numeric NOT NULL DEFAULT '1',
	`subtotal` FLOAT NOT NULL,
	`promo_id` INT NOT NULL,
	`tax_id` INT NOT NULL,
	`shipping_id` INT NOT NULL DEFAULT '0',
	`total` FLOAT NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
);

CREATE TABLE `promo` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`value` int(3) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
);

CREATE TABLE `tax` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	`value` FLOAT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `shipping` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`address_id` INT NOT NULL,
	`km` numeric NOT NULL UNIQUE,
	`value` FLOAT NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
);

CREATE TABLE `address` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`street` varchar(255) NOT NULL,
	`number` numeric NOT NULL,
	`floor` varchar(255) NOT NULL,
	`cp` numeric NOT NULL,
	`city` varchar(255) NOT NULL,
	`province` varchar(255) NOT NULL,
	`country_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `country` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

ALTER TABLE `products` ADD CONSTRAINT `products_fk0` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`);

ALTER TABLE `users` ADD CONSTRAINT `users_fk0` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`);

ALTER TABLE `users` ADD CONSTRAINT `users_fk1` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`);

ALTER TABLE `cart` ADD CONSTRAINT `cart_fk0` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`);

ALTER TABLE `cart` ADD CONSTRAINT `cart_fk1` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`);

ALTER TABLE `cart` ADD CONSTRAINT `cart_fk2` FOREIGN KEY (`promo_id`) REFERENCES `promo`(`id`);

ALTER TABLE `cart` ADD CONSTRAINT `cart_fk3` FOREIGN KEY (`tax_id`) REFERENCES `tax`(`id`);

ALTER TABLE `cart` ADD CONSTRAINT `cart_fk4` FOREIGN KEY (`shipping_id`) REFERENCES `shipping`(`id`);

ALTER TABLE `shipping` ADD CONSTRAINT `shipping_fk0` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`);

ALTER TABLE `address` ADD CONSTRAINT `address_fk0` FOREIGN KEY (`country_id`) REFERENCES `country`(`id`);

ALTER TABLE `products`DEFAULT CHARACTER SET utf8mb4;

ALTER TABLE `users` DEFAULT CHARACTER SET utf8mb4;

ALTER TABLE `categories` DEFAULT CHARACTER SET utf8mb4;

ALTER TABLE `role` DEFAULT CHARACTER SET utf8mb4;

ALTER TABLE `cart` DEFAULT CHARACTER SET utf8mb4;

ALTER TABLE `promo` DEFAULT CHARACTER SET utf8mb4;

ALTER TABLE `tax` DEFAULT CHARACTER SET utf8mb4;

ALTER TABLE `shipping` DEFAULT CHARACTER SET utf8mb4;

ALTER TABLE `address` DEFAULT CHARACTER SET utf8mb4;

ALTER TABLE `country` DEFAULT CHARACTER SET utf8mb4;

