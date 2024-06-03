CREATE TABLE medium_ion (
  medium_id integer REFERENCES medium(id),
  ion_id integer REFERENCES ion(id),
  molarity numeric,
  CONSTRAINT medium_ion_pkey PRIMARY KEY (medium_id, ion_id)
)
