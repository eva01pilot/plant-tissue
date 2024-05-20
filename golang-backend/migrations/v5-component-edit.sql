ALTER TABLE Component
DROP COLUMN sign;

ALTER TABLE Component
DROP COLUMN atomic_weight;

ALTER TABLE Component
DROP COLUMN atomic_number;

ALTER TABLE Component
ADD name varchar(30) NOT NULL;
