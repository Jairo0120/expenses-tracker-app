export async function createSaving(
  token,
  { val_saving, description, date_saving, create_recurrent_saving, cycle_id },
) {
  console.log(
    "Creating saving",
    val_saving,
    description,
    date_saving,
    create_recurrent_saving,
    cycle_id,
  );
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/savings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      val_saving,
      description,
      date_saving,
      create_recurrent_saving,
      ...(cycle_id && { cycle_id }),
    }),
  });

  return {
    status: response.status,
    data: await response.json(),
  };
}

export async function getSavings(token, filters) {
  console.log("Getting savings", filters);
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/savings?${query}`,
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

export async function getGroupedSavings(token, filters) {
  console.log("Getting grouped savings", filters);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/savings/grouped-savings`,
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

export async function updateSaving(
  token,
  { saving_id, val_saving, description },
) {
  console.log("Updating saving", val_saving, description);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/savings/${saving_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        val_saving,
        description,
      }),
    },
  );

  return {
    status: response.status,
    data: await response.json(),
  };
}

export async function deleteSaving(token, saving_id) {
  console.log("Deleting saving", saving_id);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/savings/${saving_id}`,
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

export async function getRecurrentSavings(token, filters) {
  console.log("Getting recurrent_savings", filters);
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/recurrent_savings?${query}`,
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

export async function createRecurrentSaving(
  token,
  { val_saving, description },
) {
  console.log("Creating recurrent saving", val_saving, description);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/recurrent_savings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        val_saving,
        description,
      }),
    },
  );

  return {
    status: response.status,
    data: await response.json(),
  };
}

export async function updateRecurrentSaving(
  token,
  { recurrent_saving_id, val_saving, description, enabled },
) {
  console.log("Updating recurrent saving", val_saving, description, enabled);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/recurrent_savings/${recurrent_saving_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        val_saving,
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

export async function deleteRecurrentSaving(token, recurrent_saving_id) {
  console.log("Deleting recurrent saving", recurrent_saving_id);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/recurrent_savings/${recurrent_saving_id}`,
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
