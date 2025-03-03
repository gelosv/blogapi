const nodeEnv = process.env.NODE_ENV

if(!nodeEnv) {
  console.log(nodeEnv, 'env')
  process.loadEnvFile()
}

export const {
  JWT_KEY: jwtKey = '',
} = process.env;
