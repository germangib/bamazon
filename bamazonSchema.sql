DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;
drop table products_tbl;
create table products_tbl (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name varchar(45) NULL, 
    department_name varchar(45) NULL,
    price INTEGER(10),
    stock_quantity INTEGER(10), 
    PRIMARY KEY (item_id)
); 

INSERT INTO products_tbl (product_name, department_name, price, stock_quantity)
VALUES ("Bicycle", "Sports", 40.00, 10);

INSERT INTO products_tbl (product_name, department_name, price, stock_quantity)
VALUES ("Laptop Computer", "Electronics", 1900.00, 5);
INSERT INTO products_tbl (product_name, department_name, price, stock_quantity)
VALUES ("Pen", "Office", 10.00, 100);
INSERT INTO products_tbl (product_name, department_name, price, stock_quantity)
VALUES ("Computer Keyboard", "Electronics", 25.00, 10);
INSERT INTO products_tbl (product_name, department_name, price, stock_quantity)
VALUES ("Computer Speakers", "Electronics", 240.00, 50);
INSERT INTO products_tbl (product_name, department_name, price, stock_quantity)
VALUES ("Notebook", "Office", 2.00, 10);
INSERT INTO products_tbl (product_name, department_name, price, stock_quantity)
VALUES ("Dog Food", "Pets", 20.00, 5);
INSERT INTO products_tbl (product_name, department_name, price, stock_quantity)
VALUES ("Nail cutter", "Pets", 5.00, 15);
INSERT INTO products_tbl (product_name, department_name, price, stock_quantity)
VALUES ("Princess Dress", "Clothing", 75.00, 10);
INSERT INTO products_tbl (product_name, department_name, price, stock_quantity)
VALUES ("Men's Jacket", "Clothing", 40.00, 26);

select * from products_tbl;
