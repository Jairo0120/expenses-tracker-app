export async function getBudgets(token) {
  console.log("Getting budgets...");
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/recurrent_budgets`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export async function createBudget(token, { val_budget, description }) {
  console.log("Creating budget", val_budget, description);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/recurrent_budgets`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        val_budget,
        description,
      }),
    }
  );

  return {
    status: response.status,
    data: await response.json(),
  };
}

export async function updateBudget(
  token,
  { budget_id, val_budget, description }
) {
  console.log("Updating budget", val_budget, description);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/recurrent_budgets/${budget_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        val_budget,
        description,
      }),
    }
  );

  return {
    status: response.status,
    data: await response.json(),
  };
}

export async function deleteBudget(token, budget_id) {
  console.log("Deleting budget", budget_id);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/recurrent_budgets/${budget_id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    status: response.status,
    data: await response.json(),
  };
}
