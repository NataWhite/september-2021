import { Request } from 'express'
import { User } from "@prisma/client";

export interface MiddlwareRequestInterface extends Request {
  user: User
}