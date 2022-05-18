
/* Delete the items table */
DROP TABLE IF EXISTS items;

/* Create the items table */
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  code VARCHAR(254) UNIQUE NULL,
  sku VARCHAR(254) UNIQUE NOT NULL,
  nama VARCHAR(254) NOT NULL,
  harga DECIMAL DEFAULT(0) NOT NULL,
  gambar1 VARCHAR(254),
  gambar2 VARCHAR(254),
  gambar3 VARCHAR(254),
  gambar4 VARCHAR(254),
  keterangan TEXT
);


-- INSERT INTO items (code, sku, nama, keterangan, harga) VALUES 
-- ('110', '110', 'Barang-110', null, 10000),
-- ('111', '111', 'Barang-111', null, 11000),
-- ('112', '112', 'Barang-112', null, 12000),
-- ('113', '113', 'Barang-113', null, 13000),
-- ('114', '114', 'Barang-114', null, 14000),
-- ('115', '115', 'Barang-115', null, 15000),
-- ('116', '116', 'Barang-116', null, 16000),
-- ('117', '117', 'Barang-117', null, 17000),
-- ('118', '118', 'Barang-118', null, 18000),
-- ('119', '119', 'Barang-119', null, 19000),
-- ('120', '120', 'Barang-120', null, 20000),
-- ('121', '121', 'Barang-121', null, 21000),
-- ('122', '122', 'Barang-122', null, 22000),
-- ('123', '123', 'Barang-123', null, 23000),
-- ('124', '124', 'Barang-124', null, 24000),
-- ('125', '125', 'Barang-125', null, 25000),
-- ('126', '126', 'Barang-126', null, 26000),
-- ('127', '127', 'Barang-127', null, 27000),
-- ('128', '128', 'Barang-128', null, 28000),
-- ('129', '129', 'Barang-129', null, 29000),
-- ('130', '130', 'Barang-130', null, 30000),
-- ('131', '131', 'Barang-131', null, 31000),
-- ('132', '132', 'Barang-132', null, 32000),
-- ('133', '133', 'Barang-133', null, 33000),
-- ('134', '134', 'Barang-134', null, 34000),
-- ('135', '135', 'Barang-135', null, 35000),
-- ('136', '136', 'Barang-136', null, 36000),
-- ('137', '137', 'Barang-137', null, 37000),
-- ('138', '138', 'Barang-138', null, 38000),
-- ('139', '139', 'Barang-139', null, 38000);
