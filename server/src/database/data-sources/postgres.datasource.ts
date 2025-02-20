import configuration from 'src/config/configuration';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as configDotenv } from 'dotenv';
import { ConfigSchema } from 'src/config';

configDotenv({
  path: `envs/.env.${process.env.NODE_ENV}`,
});

const config: ConfigSchema = configuration();

export const dataSourceOption: DataSourceOptions = {
  type: 'mysql',
  host: config.mysqlHost,
  port: config.mysqlPort,
  username: config.mysqlUserName,
  password: config.mysqlPassword,
  database: config.mysqlDatabaseName,
  dropSchema: false,
  synchronize: false,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
};
export const dataSource = new DataSource(dataSourceOption);
