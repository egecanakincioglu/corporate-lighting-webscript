import {
  FirstLoginData,
  PendingEmailData,
  SQLData,
  UploadsData,
} from "../@types/database";
import { PartialRecord } from "../@types/objects";
import { JSONDatabase } from "../modules/database/JSONDatabase";

export const sqlDB = new JSONDatabase<SQLData>("./database/sql.json");
export const firstLoginDB = new JSONDatabase<FirstLoginData>(
  "./database/firstLogin.json"
);
export const uploadsDB = new JSONDatabase<UploadsData>(
  "./database/uploads.json"
);
export const pendingEmailDB = new JSONDatabase<PartialRecord<PendingEmailData>>(
  "./database/pendingEmails.json"
);
