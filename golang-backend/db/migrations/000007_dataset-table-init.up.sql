CREATE TABLE dataset (
  id SERIAL PRIMARY KEY,
  medium_id INTEGER NOT NULL,
  plant_height NUMERIC,
  chlorophyll_percent NUMERIC,
  true_leaves_count INTEGER,
  node_count INTEGER,
  side_shoots_count INTEGER,
  reproduction_coefficient NUMERIC,
  CONSTRAINT medium_id_pkey FOREIGN KEY (medium_id) REFERENCES medium (id)
);
