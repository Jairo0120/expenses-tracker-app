export default async function initDb(db) {
  console.log("Creating database if needed...");
  try {
    await db.execAsync(
      `
        CREATE TABLE IF NOT EXISTS cycle (
            id                            INTEGER  NOT NULL,
            created_at                    DATETIME NOT NULL,
            updated_at                    DATETIME NOT NULL,
            description                   VARCHAR  NOT NULL,
            start_date                    DATE     NOT NULL,
            end_date                      DATE     NOT NULL,
            is_active                     BOOLEAN  NOT NULL,
            PRIMARY KEY (
                id
            )
        );

        CREATE TABLE IF NOT EXISTS budget (
            id          INTEGER  NOT NULL,
            created_at  DATETIME NOT NULL,
            updated_at  DATETIME NOT NULL,
            description VARCHAR  NOT NULL,
            val_budget  FLOAT    NOT NULL,
            cycle_id    INTEGER  NOT NULL,
            PRIMARY KEY (
                id
            ),
            FOREIGN KEY (
                cycle_id
            )
            REFERENCES cycle (id)
        );

        CREATE TABLE IF NOT EXISTS expense (
            id                   INTEGER     NOT NULL,
            created_at           DATETIME    NOT NULL,
            updated_at           DATETIME    NOT NULL,
            description          VARCHAR     NOT NULL,
            val_expense          FLOAT       NOT NULL,
            date_expense         DATETIME    NOT NULL,
            is_recurrent_expense BOOLEAN     NOT NULL,
            budget_id            INTEGER,
            cycle_id             INTEGER     NOT NULL,
            PRIMARY KEY (
                id
            ),
            FOREIGN KEY (
                budget_id
            )
            REFERENCES budget (id),
            FOREIGN KEY (
                cycle_id
            )
            REFERENCES cycle (id)
        );`,
    );
  } catch (e) {
    console.error(e);
  }
}
