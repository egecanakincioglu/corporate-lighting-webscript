import { MySQLDB } from '../modules/database/Connection';
import { VisitorLogger } from '../modules/helpers/VisitorLogger';

export const connection = new MySQLDB();
export const visitorLogger = new VisitorLogger();
