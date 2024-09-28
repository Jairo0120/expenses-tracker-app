export async function getCycleStatus(token, filters) {
  console.log("Getting incomes", filters);
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/cycles/cycle-status?${query}`,
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

  if (response.status !== 200) {
    return {
      status: response.status,
      data,
    };
  }

  if (data.total_incomes === 0) {
    return {
      status: response.status,
      data: {
        totalExpenses: data.total_recurrent_expenses + data.total_expenses,
        moneyAvailable: 0,
      },
    };
  }

  const moneyAvailable =
    data.total_incomes - (data.total_recurrent_expenses + data.total_savings);
  const totalSpent = data.total_expenses;

  return {
    status: response.status,
    data: {
      totalExpenses: totalSpent,
      moneyAvailable: moneyAvailable,
    },
  };
}
