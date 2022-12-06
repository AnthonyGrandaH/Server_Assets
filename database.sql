CREATE DATABASE proyecto_assets

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY DEFAULT,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL

);


insert into users (user_name, user_email, user_password) 
values ('admin', 'admin@gmail.com', 'admin')