const sql = `
DROP TABLE IF EXISTS books;
CREATE TABLE books
(
  id BIGSERIAL PRIMARY KEY,
  publish_date character varying(50),
  price integer,
  category integer,
  model character varying(50),
  name character varying(150),
  author character varying(150),
  cover_url character varying(150),
  sku character varying(20),
  last_update bigint,
  summary text COLLATE pg_catalog."default"
)
WITH (
  OIDS=FALSE
);
ALTER TABLE books
  OWNER TO eibo;

CREATE UNIQUE INDEX book_id_idx ON books (id);
CREATE UNIQUE INDEX book_sku_idx ON books (sku);
CREATE INDEX book_category_idx ON books (category);
CREATE UNIQUE INDEX book_name_idx ON books (name);
`;

module.exports.SQL = sql;