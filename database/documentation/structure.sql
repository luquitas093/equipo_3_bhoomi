CREATE TABLE `users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `firstName` VARCHAR(255) NOT NULL,
   `lastName` VARCHAR(255) NOT NULL,
   `date` DATE NOT NULL,
   `phone` VARCHAR(255) NOT NULL,
   `avatar` VARCHAR(255) NOT NULL,
   `email` VARCHAR(255) NOT NULL,
   `passwordHash` VARCHAR(255) NOT NULL,
   `addressId` INT,
   `roleId` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `role` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255),
   PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `description` TEXT,
   `image` VARCHAR(255) NOT NULL,
   `quantity` VARCHAR(255) NOT NULL,
   `price` FLOAT NOT NULL,
   `categoryId` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `cart` (
   `id` INT NOT NULL,
   `usersId` INT NOT NULL,
   `productsId` INT NOT NULL,
   `quantity` VARCHAR(255) NOT NULL,
   `subtotal` VARCHAR(255) NOT NULL,
   `promoId` INT NOT NULL,
   `shippingId` INT NOT NULL,
   `total` FLOAT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `promo` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `value` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `shipping` (
   `id` INT NOT NULL,
   `addressId` INT NOT NULL,
   `km` VARCHAR(255) NOT NULL,
   `value` FLOAT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `address` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `street` VARCHAR(255) NOT NULL,
   `number` VARCHAR(255) NOT NULL,
   `floor` VARCHAR(255),
   `cp` VARCHAR(255) NOT NULL,
   `city` VARCHAR(255) NOT NULL,
   `province` VARCHAR(255) NOT NULL,
   `country` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `users` ADD CONSTRAINT `FK_9a8e42ab-03d1-4391-b3bc-35697acd251d` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`);

ALTER TABLE `users` ADD CONSTRAINT `FK_a413df7f-6834-4c4e-b0ba-4a2c75a9c680` FOREIGN KEY (`addressId`) REFERENCES `address`(`id`);

ALTER TABLE `products` ADD CONSTRAINT `FK_d90698a7-59e4-44a8-805d-e37112855561` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`);

ALTER TABLE `cart` ADD CONSTRAINT `FK_73de4cbc-2cb8-44b7-a2f7-aa0e585c49b9` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`);

ALTER TABLE `cart` ADD CONSTRAINT `FK_01c10951-994c-4a07-966f-d0b782126546` FOREIGN KEY (`productsId`) REFERENCES `products`(`id`);

ALTER TABLE `cart` ADD CONSTRAINT `FK_04a78bc0-4416-4520-bbb4-cdc6cc960c84` FOREIGN KEY (`promoId`) REFERENCES `promo`(`id`);

ALTER TABLE `cart` ADD CONSTRAINT `FK_960a3cb5-e867-4726-980e-b9141dd20dec` FOREIGN KEY (`shippingId`) REFERENCES `shipping`(`id`);

ALTER TABLE `shipping` ADD CONSTRAINT `FK_cb87685b-d280-4be1-af6e-0f7f55e31424` FOREIGN KEY (`addressId`) REFERENCES `address`(`id`);