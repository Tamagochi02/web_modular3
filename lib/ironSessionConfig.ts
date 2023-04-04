import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { IronSessionOptions, IronSession } from 'iron-session';
import type { Usuario } from '@prisma/client'
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

interface ModularSession extends IronSession {
  user: Omit<Usuario, 'contrasena'>,
  role: string
}

export interface IronNextApiRequest extends NextApiRequest {
  session: ModularSession
}

export type IronNextApiHandler = (request: IronNextApiRequest, response: NextApiResponse) => unknown | Promise<unknown>

export const ironOptions: IronSessionOptions = {
  cookieName: "gestor_modular_session",
  password: process.env.IRON_SESSION_COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  },
}

export const privateRoute = (handler: IronNextApiHandler, ignoreMethods = "") => {
  return withIronSessionApiRoute((req: IronNextApiRequest, res) => {
    if (ignoreMethods.includes(req.method)) return handler(req, res)
    if (!req.session.user) return res.status(401).json({ error: 'No autorizado' })
    return handler(req, res)
  }, ironOptions)

}

export const privatePage = (handler) => withIronSessionSsr(handler, ironOptions)
