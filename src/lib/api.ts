export async function verifyUserFromAPI(
  sessionToken: string | undefined
): Promise<boolean> {
  if (!sessionToken) return false;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/verifyUser`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionToken }),
    }
  );

  return response.ok;
}
