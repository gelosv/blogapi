const nodeEnv = process.env.NODE_ENV

if(!nodeEnv) {
  process.loadEnvFile()
}

export const {
  JWT_KEY: jwtKey = '',
  JWT_EXPIRE: jwtExpires = '3h',
} = process.env;
