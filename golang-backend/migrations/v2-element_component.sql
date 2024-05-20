ALTER TABLE Component_Element
  ALTER COLUMN component_id TYPE int,
  ALTER COLUMN element_id TYPE int;

ALTER TABLE Component_Element
ADD CONSTRAINT  fk_element_id FOREIGN KEY (element_id) REFERENCES Element(id);


ALTER TABLE Component_Element
ADD CONSTRAINT  fk_component_id FOREIGN KEY (component_id) REFERENCES Component(id);
