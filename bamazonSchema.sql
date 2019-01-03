DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL (10, 2) NOT NULL,
    stock_quantity INT(6) default 0,
    PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Cliff Bar x 12)', 'Health', 14.25, 5),
       ('Kaskade Platinum ActionPacs Dishwasher Detergent', 'Household', 19.85, 10),
       ('Velvet Suit Hangers - 50 pack', 'Storage', 25.00, 25),
       ('Froot of the Lume White Crew T-Shirt - 6 pack', 'Clothing', 18.49, 50),
       ('Her (Blu-Ray)', 'Movies', 7.99, 10),
       ('Thermouse Intak 24 Ounce Hydration Bottle with Meter', 'Kitchen', 9.00, 8),
       ('Pooo-Pourry Before-You-Go Toilet Spray 4 oz Bottle', 'Household', 11.99, 18),
       ('PetSaphe Cat Flap', 'Pet Supplies', 10.99, 3),
       ('XOX Great Grips Silicone Sink Strainer', 7.94, 40),
       ('Merino Wool Beanie', 'Clothing', 14.99, 36),
       
SELECT * FROM products;