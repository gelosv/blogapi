declare namespace Express {
  export interface Request {
    user: {
      sub: number,
      name: string,
      nickname: string,
      rol: string
    }
  }
}
