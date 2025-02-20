import * as Joi from 'joi';
import { ConfigSchema } from './types';

export default () => {
  const schema = Joi.object<ConfigSchema, true>({
    mysqlHost: Joi.string().required(),
    mysqlPort: Joi.number().required(),
    mysqlUserName: Joi.string().required(),
    mysqlPassword: Joi.string().required(),
    mysqlDatabaseName: Joi.string().required(),

    slackBotOauthToken: Joi.string().required(),
  });

  const config = {
    mysqlHost: process.env.MYSQL_HOST,
    mysqlPort: process.env.MYSQL_PORT,
    mysqlUserName: process.env.MYSQL_USERNAME,
    mysqlPassword: process.env.MYSQL_PASSWORD,
    mysqlDatabaseName: process.env.MYSQL_DATABASE,

    slackBotOauthToken: process.env.SLACK_BOT_OAUTH_TOKEN,
  };

  const { error, value } = schema.validate(config);

  if (error) {
    throw new Error('Env Missing ' + error.message);
  }

  return value;
};
