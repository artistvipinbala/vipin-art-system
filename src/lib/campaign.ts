/** Reads ad source/campaign from the URL so leads can be attributed later. */
export function getCampaignParams(): { source?: string; campaign?: string } {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const source = params.get("utm_source") ?? params.get("source") ?? undefined;
  const campaign = params.get("utm_campaign") ?? params.get("campaign") ?? undefined;
  return {
    ...(source ? { source: source.slice(0, 100) } : {}),
    ...(campaign ? { campaign: campaign.slice(0, 100) } : {}),
  };
}
