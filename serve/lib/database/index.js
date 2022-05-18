var format = require("pg-format");

module.exports = {
  useEloquent: (pgsql) => {
    const getLengthItem = async (pgsql, request = null) => {
      
      const qFilter = request ? queryFilterItem(request.query) : '';
      try {
        const exe = await pgsql.query(`SELECT COUNT(id) as counter FROM items ${qFilter}`);
        return Number(exe.rows[0].counter);
      } catch (error) {
        console.error(error, "ERROR => useEloquent::getTotalItem");
        throw error;
      }
    };

    const queryFilterItem = (query) => {
      
      let sql = "";

      if (query.search) {
        sql += format(`CONCAT(sku, ' ', nama) ILIKE '%${query.search}%'`);
      }

      return String(sql).length ? `WHERE ${sql}` : '';
    };

    return {
      getProducts: async (request) => {
        const limit = request.query.limit ?? 10,
          offset = request.query.offset ?? 0;

        const qFilter = queryFilterItem(request.query);
        const sql = `SELECT id, code, nama, sku, harga, gambar1 FROM items ${qFilter} LIMIT ${limit} OFFSET ${offset}`;

        const { rows } = await pgsql.query(sql);

        const total = await getLengthItem(pgsql, request);

        return { rows, total };
      },

      getTotalItems: async (request) => {
        return await getLengthItem(pgsql, request);
      },

      hasItemCode: async (code) => {
        try {
          const exe = await pgsql.query(
            "SELECT COUNT(id) as counter FROM items WHERE code = $1 LIMIT 1",
            [code]
          );
          return Boolean(exe.rows.length && Number(exe.rows[0].counter) > 0);
        } catch (error) {
          console.error(error, "ERROR => useEloquent::hasItemCode");
          throw error;
        }
      },

      hasItemSKU: async (sku) => {
        try {
          const exe = await pgsql.query(
            "SELECT count(id) as counter FROM items WHERE sku = $1 LIMIT 1",
            [sku]
          );

          return Boolean(exe.rows.length && Number(exe.rows[0].counter) > 0);
        } catch (error) {
          console.error(error, "ERROR => useEloquent::hasItemSKU");
          throw error;
        }
      },

      insertItem: async (row) => {
        return new Promise(async (resolve, reject) => {
          const qSQL = format(
            "INSERT INTO items (code, nama, sku, harga, gambar1, gambar2, gambar3, gambar4, keterangan) VALUES %L",
            [[Object.values(row)]]
          );
          try {
            resolve(await pgsql.query(qSQL));
          } catch (error) {
            reject(error);
          }
        });
      },
    };
  },
};
