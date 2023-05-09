import { withIronSessionApiRoute } from "iron-session/next";
import type { IronNextApiHandler } from '../../lib/ironSessionConfig'
import { ironOptions } from '../../lib/ironSessionConfig'
import { prisma } from "../../lib/prisma";

export const updateEtapa3: IronNextApiHandler = async (req, res) => {
    const { url, etapaId} = req.body
    const etapa3 = await prisma.docEtapa3.update({
        data: {
            url
        },
        where: {
            id: etapaId
        }
    })
    res.json(etapa3)
}

export default withIronSessionApiRoute(updateEtapa3, ironOptions)