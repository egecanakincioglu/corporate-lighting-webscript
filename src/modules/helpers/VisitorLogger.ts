import geoip from "geoip-lite";
import { pathTranslations } from "@/projectData";
import { connection } from "@/src/lib/db";
import { VisitData } from "@/src/@types/database";

export class VisitorLogger {
  public async logVisitEntry(
    ipAddress: string,
    pageViewed: string,
    referrer: string,
    userAgent: string
  ): Promise<void> {
    if (!(pageViewed in pathTranslations)) return;

    const geo = geoip.lookup(ipAddress);
    const country = geo ? geo.country : "Unknown";
    const city = geo ? geo.city : "Unknown";

    const visitData: Omit<VisitData, "visitDate"> = {
      ipAddress,
      country,
      city,
      pageViewed,
      referrer,
      userAgent,
    };

    const db = (await connection.initalize())?.db;

    if (!db) return;

    await db.visits.create({
      data: {
        ip_address: visitData.ipAddress,
        country: visitData.country,
        city: visitData.city,
        page_viewed: visitData.pageViewed,
        referrer: visitData.referrer,
        user_agent: visitData.userAgent,
      },
    });
  }
}
