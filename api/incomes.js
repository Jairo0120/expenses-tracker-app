export async function createIncome(
  token,
  { val_income, description, date_income, create_recurrent_income }
) {
  console.log(
    "Creating income",
    val_income,
    description,
    date_income,
    create_recurrent_income
  );
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/incomes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      val_income,
      description,
      date_income,
      create_recurrent_income,
    }),
  });

  return {
    status: response.status,
    data: await response.json(),
  };
}

export async function getIncomes(token, filters) {
  console.log("Getting incomes", filters);
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/incomes?${query}`,
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

export async function updateIncome(
  token,
  { income_id, val_income, description }
) {
  console.log("Updating income", val_income, description);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/incomes/${income_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        val_income,
        description,
      }),
    }
  );

  return {
    status: response.status,
    data: await response.json(),
  };
}

export async function deleteIncome(token, income_id) {
  console.log("Deleting income", income_id);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/incomes/${income_id}`,
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

export async function getRecurrentIncomes(token, filters) {
  console.log("Getting recurrent incomes", filters);
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/recurrent_incomes?${query}`,
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

export async function createRecurrentIncome(
  token,
  { val_income, description }
) {
  console.log("Creating recurrent income", val_income, description);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/recurrent_incomes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        val_income,
        description,
      }),
    }
  );

  return {
    status: response.status,
    data: await response.json(),
  };
}

export async function updateRecurrentIncome(
  token,
  { recurrent_income_id, val_income, description, enabled }
) {
  console.log("Updating recurrent income", val_income, description);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/recurrent_incomes/${recurrent_income_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        val_income,
        description,
        enabled,
      }),
    }
  );

  return {
    status: response.status,
    data: await response.json(),
  };
}

export async function deleteRecurrentIncome(token, recurrent_income_id) {
  console.log("Deleting recurrent income", recurrent_income_id);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/recurrent_incomes/${recurrent_income_id}`,
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
