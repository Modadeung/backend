import * as Joi from 'joi';
import { ConfigSchema } from './types';

export default () => {
  const schema = Joi.object<ConfigSchema, true>({
    postgresHost: Joi.string().required(),
    postgresPort: Joi.number().required(),
    postgresUserName: Joi.string().required(),
    postgresPassword: Joi.string().required(),
    postgresDatabaseName: Joi.string().required(),

    slackBotOauthToken: Joi.string().required(),

    openAPIUserName: Joi.string().required(),
    openAPIPassWord: Joi.string().required(),
  });

  const config = {
    postgresHost: process.env.POSTGRES_HOST,
    postgresPort: process.env.POSTGRES_PORT,
    postgresUserName: process.env.POSTGRES_USERNAME,
    postgresPassword: process.env.POSTGRES_PASSWORD,
    postgresDatabaseName: process.env.POSTGRES_DATABASE,

    slackBotOauthToken: process.env.SLACK_BOT_OAUTH_TOKEN,

    openAPIUserName: process.env.OPEN_API_USERNAME,
    openAPIPassWord: process.env.OPEN_API_PASSWORD,
  };

  const { error, value } = schema.validate(config);

  if (error) {
    throw new Error('Env Missing ' + error.message);
  }

  return value;
};
