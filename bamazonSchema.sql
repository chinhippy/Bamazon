DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(150) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  stock_quantity INTEGER(6),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Lenovo Yoga 720', 'Electronics', 900.00, 5),
       ('Logitech Scroll Mouse', 'Electronics', 49.00, 10),
	   ('Kaskade Platinum ActionPacs Dishwasher Detergent', 'Household', 19.85, 10),
       ('Velvet Suit Hangers - 50 pack', 'Storage', 25.00, 25),
       ('Froot of the Lume White Crew T-Shirt - 6 pack', 'Clothing', 18.49, 50),
       ('Pooo-Pourry Before-You-Go Toilet Spray 4 oz Bottle', 'Household', 11.99, 18),
       ('Merino Wool Beanie', 'Clothing', 14.99, 36),
       ('Her (DVD)', 'Movies', 7.99, 10),
       ('Thermouse Intak 24 Ounce Hydration Bottle with Meter', 'Kitchen', 9.00, 8),
       ('Jobs (Blu-ray)', 'Movies', 8.99, 10);

SELECT * FROM products;