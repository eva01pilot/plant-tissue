------------- Medium_Component ------------------

CREATE TABLE IF NOT EXISTS Medium_Component (
  medium_id SERIAL,
  component_id SERIAL,
  mass int NOT NULL,
  PRIMARY KEY(component_id, medium_id)
);

ALTER TABLE Medium_Component
ADD CONSTRAINT fk_medium_id FOREIGN KEY (medium_id) REFERENCES Medium(id);

ALTER TABLE Medium_Component
ADD CONSTRAINT fk_component_id FOREIGN KEY (component_id) REFERENCES Component(id);
