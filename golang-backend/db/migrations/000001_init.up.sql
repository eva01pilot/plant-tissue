BEGIN;

CREATE TABLE IF NOT EXISTS category_of_component (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  has_formula boolean
);
CREATE TABLE IF NOT EXISTS component (
  id SERIAL PRIMARY KEY,
  formula varchar(10) UNIQUE,
  molar_mass integer,
  type_id integer NOT NULL,
  CONSTRAINT fk_category_of_component FOREIGN KEY (type_id) REFERENCES category_of_component(id)
);


CREATE TABLE IF NOT EXISTS ion(
  id serial PRIMARY KEY,
  formula varchar(10) UNIQUE,
  molar_mass integer
);

CREATE TABLE IF NOT EXISTS component_ion (
  component_id    integer REFERENCES component (id),
  ion_id integer REFERENCES ion (id),
  fraction numeric,
  CONSTRAINT component_ion_pkey PRIMARY KEY (component_id, ion_id)
);

CREATE TABLE IF NOT EXISTS medium (
  id serial PRIMARY KEY,
  name varchar(255) UNIQUE,
  description text,
  thumbnail text
);

CREATE TABLE IF NOT EXISTS medium_component (
  medium_id integer REFERENCES medium (id),
  component_id integer REFERENCES component (id),
  mg_per_liter numeric
);

CREATE TABLE IF NOT EXISTS platform_users (
  id serial PRIMARY KEY,
  username varchar(255) UNIQUE,
  avatar text,
  password_hash text
);

COMMIT;
