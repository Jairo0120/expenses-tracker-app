export async function getBudgets(token) {
  console.log("Getting budgets...");
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/budgets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data =
    response.headers.get("Content-Type") === "application/json"
      ? await response.json()
      : await response.text();

  return {
    status: response.status,
    data: data,
  };
}
