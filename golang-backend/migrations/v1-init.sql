------------- User table ------------------
CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY,
  username varchar(30) NOT NULL,
  password_hash text NOT NULL,
  avatar text
);

------------- Element ------------------

CREATE TABLE IF NOT EXISTS Element (
  id SERIAL PRIMARY KEY,
  sign varchar(2) NOT NULL,
  atomic_weight numeric NOT NULL,
  atomic_number smallint NOT NULL
);


------------- Component_type ------------------

CREATE TABLE IF NOT EXISTS Component_type (
  id SERIAL PRIMARY KEY,
  name varchar(30) NOT NULL,
  has_formula boolean NOT NULL
);


------------- Component ------------------

CREATE TABLE IF NOT EXISTS Component (
  id SERIAL PRIMARY KEY,
  sign varchar(2) NOT NULL,
  atomic_weight numeric NOT NULL,
  atomic_number smallint NOT NULL,
  type_id int NOT NULL
);

ALTER TABLE Component
ADD CONSTRAINT fk_component_type FOREIGN KEY (type_id) REFERENCES Component_type (id);


------------- Component_Element ------------------

CREATE TABLE IF NOT EXISTS Component_Element (
  component_id SERIAL,
  element_id SERIAL,
  quantity int NOT NULL,
  PRIMARY KEY(component_id, element_id)
);


------------- Medium ------------------

CREATE TABLE IF NOT EXISTS Medium (
  id SERIAL PRIMARY KEY,
  name varchar(30) NOT NULL,
  description text,
  thumbnail text
);


