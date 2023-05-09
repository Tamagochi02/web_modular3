import { withIronSessionApiRoute } from "iron-session/next";
import type { IronNextApiHandler } from '../../lib/ironSessionConfig'
import { ironOptions } from '../../lib/ironSessionConfig'
import { prisma } from "../../lib/prisma";

export const updateDocument: IronNextApiHandler = async (req, res) => {
    const { nombre, titulo, etapa, documentoId } = req.body
    const documento = await prisma.documento.update({
        data: {
            nombre, titulo, etapa
        },
        where: {
            id: documentoId
        }
    })
    res.json(documento)
}

export default withIronSessionApiRoute(updateDocument, ironOptions)