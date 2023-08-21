create  DATABASE exam8base;
\c exam8base;

CREATE TYPE role AS ENUM('man', 'women', 'Man', 'Women', 'MEN', 'WOMEN');


create table users(
    id serial primary key,
    username varchar(20),
    password varchar(100),
    email text,
    ball int DEFAULT 0,
    role "role",
    birthday date,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,
);


create table users_devices(
    id serial primary key,
    user_id int References users(id),
    acssestoken text,
    refreshtoken text  
);


create table products(
    id serial primary key,
    title varchar(20),
    price varchar(100),
    category int REFERENCES subcategory(id)
);

insert into products (title, price, category) values('telvizor xiaomi 64', '120000', 1);
insert into products (title, price, category) values('ayiqcha vinni pux', '12900', 4 );



create TABLE category(
    id serial primary key,
    name varchar(15)
);
insert into category (name) values('elektrotexnika');
insert into category (name) values('kitoblar');
insert into category (name) values('o''yinchoq');



create TABLE subcategory(
    id serial primary key,
    parent_id integer REFERENCES category(id),
    sub_category_name varchar(15)
);

insert into subcategory (parent_id, sub_category_name) values('1','dazmollar');
insert into subcategory (parent_id, sub_category_name) values('1','kir moshinalar');
insert into subcategory (parent_id, sub_category_name) values('2','enkslapediya');
insert into subcategory (parent_id, sub_category_name) values('3','ayiqchalar');




create table orders(
    id serial primary key,
    user_id int REFERENCES users(id),
    product_id int REFERENCES products(id),
);


insert into orders(user_id, product_id) values(3, 9); --gulchapcha ayiq


SELECT 
orders.id AS order_id,
  users.username AS username,
  products.title AS product_name,
  products.price AS product_price
FROM 
  orders 
  JOIN users  ON orders.user_id = users.id
  JOIN products  ON orders.product_id = products.id 
GROUP BY 
orders.id,
users.username,
products.title,
products.price;



SELECT p.*
FROM products p
JOIN subcategory s ON p.category = s.id
JOIN category c ON s.parent_id = c.id
WHERE s.sub_category_name = $1


SELECT
    p.id AS product_id,
    p.title AS product_title,
    p.price AS product_price,
    c.name AS category_name,
    sc.sub_category_name AS sub_category_name
FROM
    products p
JOIN
    subcategory sc ON p.category = sc.id
JOIN
    category c ON sc.parent_id = c.id
WHERE
    p.title ILIKE %moshina%
    OR c.name ILIKE %sam%
    OR sc.sub_category_name ILIKE %daz%;





    UPDATE
                users
            SET
                role = (
                    CASE
                        WHEN LENGTH('man') > 0 THEN 'man' ELSE role
                    END
                ),
                birthday = (
                    CASE
                        WHEN LENGTH('13/12/2008') > 0 THEN '13/12/2008' ELSE birthday
                    END
                ),
                email = (
                    CASE
                        WHEN LENGTH('momin@gmail.com') > 0 THEN 'momin@gmail.com' ELSE email
                    END
                )
            WHERE
                id = 13
                RETURNING *;





WITH deleted_user AS (
    UPDATE users
    SET deleted_at = CURRENT_TIMESTAMP
    WHERE id = 13
    RETURNING id
)
DELETE FROM orders
WHERE user_id = (SELECT id FROM deleted_user);





