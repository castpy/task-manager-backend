export const configuration = () => ({
  NODE_ENV: process.env.NEST_PROJECT_AMBIENTE,
  port: parseInt(process.env.NEST_PROJECT_PORT, 10),
  jwt: {
    secret: process.env.NEST_JWT_SECRET_KEY,
    expiresIn: process.env.NEST_JWT_EXPIRES_IN,
  },
});
