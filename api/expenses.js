export async function createExpense(
  token,
  {
    val_expense,
    description,
    date_expense,
    budget_id,
    create_recurrent_expense,
  },
) {
  console.log(
    "Creating expense",
    val_expense,
    description,
    date_expense,
    budget_id,
    create_recurrent_expense,
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
      create_recurrent_expense,
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
    },
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

export async function updateExpense(
  token,
  { expense_id, val_expense, description, budget_id },
) {
  console.log("Updating expense", val_expense, description, budget_id);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/expenses/${expense_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        val_expense,
        description,
        budget_id,
      }),
    },
  );

  return {
    status: response.status,
    data: await response.json(),
  };
}

export async function deleteExpense(token, expense_id) {
  console.log("Deleting expense", expense_id);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/expenses/${expense_id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return {
    status: response.status,
    data: await response.json(),
  };
}

export async function getRecurrentExpenses(token, filters) {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/recurrent_expenses?${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
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

export async function createRecurrentExpense(
  token,
  { val_expense, description },
) {
  console.log("Creating recurrent expense", val_expense, description);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/recurrent_expenses`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        val_expense,
        description,
      }),
    },
  );

  return {
    status: response.status,
    data: await response.json(),
  };
}

export async function updateRecurrentExpense(
  token,
  { recurrent_expense_id, val_expense, description, enabled },
) {
  console.log("Updating expense", val_expense, description, enabled);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/recurrent_expenses/${recurrent_expense_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        val_expense,
        description,
        enabled,
      }),
    },
  );

  return {
    status: response.status,
    data: await response.json(),
  };
}

export async function deleteRecurrentExpense(token, recurrent_expense_id) {
  console.log("Deleting recurrent expense", recurrent_expense_id);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/recurrent_expenses/${recurrent_expense_id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return {
    status: response.status,
    data: await response.json(),
  };
}
