ALTER TABLE component_type
ADD CONSTRAINT component_type_unique UNIQUE(name);

ALTER TABLE medium
ADD CONSTRAINT medium_unique UNIQUE(name);

ALTER TABLE component
ADD CONSTRAINT component_unique UNIQUE(name);

ALTER TABLE element
ADD CONSTRAINT element_unique UNIQUE(sign);

