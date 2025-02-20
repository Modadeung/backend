export class NestEnvUtil {
  static getEnvFilePath = () => {
    const nodeEnv = process.env.NODE_ENV;

    return `envs/.env.${nodeEnv}`;
  };
}
