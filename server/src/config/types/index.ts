import {
  IsPostgresDatabaseConfig,
  ISlackConfig,
  IOpenApiConfig,
} from '../interfaces';

export type ConfigSchema = IsPostgresDatabaseConfig &
  ISlackConfig &
  IOpenApiConfig;
