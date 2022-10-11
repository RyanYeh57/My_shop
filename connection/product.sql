USE myshop;
CREATE TABLE `products` (
    `id` int(20) NOT NULL AUTO_INCREMENT,
    `name` varchar(200) NOT NULL,
    `amount` int(20) NOT NULL,
    `inventory` int(20) NOT NULL,
    `status` varchar(1) NOT NULL,
    `description` varchar(200) NOT NULL,
    `img` varchar(1000) NOT NULL DEFAULT 'none',
    `create_date` datetime NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
  ) 