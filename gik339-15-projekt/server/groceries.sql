DROP TABLE IF EXISTS groceries;
CREATE TABLE IF NOT EXISTS groceries(
   id        INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,groceryType VARCHAR(16) NOT NULL
  ,groceryCategory VARCHAR(16) NOT NULL
  ,brand  VARCHAR(16)
  ,amount INTEGER  NOT NULL
  ,note     VARCHAR(100)
);
INSERT INTO groceries(id,groceryType,groceryCategory,brand,amount, note) VALUES (1,'Gurka','Frukt och Grönt','Gurkodlarna','2','Inte en allt för stor, den blir bara dålig.');
INSERT INTO groceries(id,groceryType,groceryCategory,brand,amount, note) VALUES (2,'Ryggbiff','Kött','Siljans Chark','3','');
INSERT INTO groceries(id,groceryType,groceryCategory,brand,amount, note) VALUES (3,'Crème Fraiche','Mejeri','Arla','1','Sent bäst-före datum');
INSERT INTO groceries(id,groceryType,groceryCategory,brand,amount, note) VALUES (4,'Jordgubbar','Frukt och Grönt','Ulvagubben','3','Rödaste gubbarna!');

select * from groceries;