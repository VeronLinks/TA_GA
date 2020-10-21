CREATE SCHEMA core;

# TABLES:

CREATE TABLE core.company_types (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL
);

CREATE TABLE core.companies (
  id SERIAL PRIMARY KEY,
  "company_typeId" INTEGER NOT NULL,
  name TEXT NOT NULL,
  address TEXT DEFAULT NULL,
  phone TEXT DEFAULT NULL,
  cif TEXT DEFAULT NULL,
  active BOOLEAN NOT NULL DEFAULT false,
  admin BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT fk_company_types_companies_id FOREIGN KEY ("company_typeId")
    REFERENCES core.company_types(id)
    ON DELETE RESTRICT
);

insert into core.company_types (type) values ('Pública');
insert into core.company_types (type) values ('Privada');