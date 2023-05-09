import { withIronSessionApiRoute } from "iron-session/next";
import type { IronNextApiHandler } from '../../lib/ironSessionConfig'
import { ironOptions } from '../../lib/ironSessionConfig'
import { prisma } from "../../lib/prisma";

export const updateEtapa3: IronNextApiHandler = async (req, res) => {
    const { url, etapaId} = req.body
    const user = await prisma.docEtapa3.update({
        data: {
            url
        },
        where: {
            id: etapaId
        }
    })
    res.json(user)
}

export default withIronSessionApiRoute(updateEtapa3, ironOptions)