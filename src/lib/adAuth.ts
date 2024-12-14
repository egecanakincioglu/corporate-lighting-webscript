export function getRedirectUri() {
  return (
    (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000") +
    "/dashboard/integrations/google-ads"
  );
}
