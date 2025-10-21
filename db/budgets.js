async function getBudgets(db) {
  const allRows = await db.getAllAsync("SELECT * FROM budget");
  console.log("Getting budgets from DB");
  for (const row of allRows) {
    console.log(row);
  }
}

export { getBudgets };
