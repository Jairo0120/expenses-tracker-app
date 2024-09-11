export async function createSaving(
  token,
  { val_saving, description, date_saving, create_recurrent_saving }
) {
  console.log(
    "Creating saving",
    val_saving,
    description,
    date_saving,
    create_recurrent_saving
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

export async function getGroupedSavings(token, filters) {
  console.log("Getting grouped savings", filters);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/savings/grouped-savings`,
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

export async function updateSaving(
  token,
  { saving_id, val_saving, description }
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
    }
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
    }
  );

  return {
    status: response.status,
    data: await response.json(),
  };
}
