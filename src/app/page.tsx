import { getSiteData } from "@/lib/site-data";
import { LocalizedHome } from "@/components/layout/LocalizedHome";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getSiteData();
  return <LocalizedHome data={data} />;
}
