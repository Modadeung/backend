import { IsPostgresDatabaseConfig, ISlackConfig } from '../interfaces';
import { IsMySQLDatabaseConfig } from '../interfaces/mysql-database.config.interface';

export type ConfigSchema = IsMySQLDatabaseConfig & ISlackConfig;
