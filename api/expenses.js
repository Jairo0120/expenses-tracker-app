export async function createExpense(
  token,
  { val_expense, description, date_expense, budget_id }
) {
  console.log(
    "Creating expense",
    val_expense,
    description,
    date_expense,
    budget_id
  );
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      val_expense,
      description,
      date_expense,
      budget_id,
    }),
  });

  return {
    status: response.status,
    data: await response.json(),
  };
}

export async function getExpenses(token, filters) {
  console.log("Getting expenses", filters);
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/expenses?${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data =
    response.headers.get("Content-Type") === "application/json"
      ? await response.json()
      : await response.text();

  return {
    status: response.status,
    data: data,
  };
}
