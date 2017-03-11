const sql = `
DROP TABLE IF EXISTS categories;
CREATE TABLE categories
(
  id BIGSERIAL PRIMARY KEY,
  name character varying(150)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE categories
  OWNER TO eibo;

CREATE UNIQUE INDEX category_id_idx ON categories (id);
CREATE UNIQUE INDEX category_name_idx ON categories (name);
`;

module.exports.SQL = sql;