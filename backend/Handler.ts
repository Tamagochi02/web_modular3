import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

interface Handlers {
    get?: NextApiHandler
    post?: NextApiHandler
    put?: NextApiHandler
    delete?: NextApiHandler
}

// Este es el controlador de las turas auxiliar al
// controlador por default que tiene Next.js
export class Handler {
    constructor(
        handlers?: Handlers,
        private readonly orchestrator = new Map<String, NextApiHandler>()
    ) {
        if (handlers) {
            if (handlers.get) this.get(handlers.get)
            if (handlers.post) this.post(handlers.post)
            if (handlers.put) this.put(handlers.put)
            if (handlers.delete) this.delete(handlers.delete)
        }
    }

    get(handler: NextApiHandler): void {
        this.addHandler('GET', handler)
    }

    post(handler: NextApiHandler): void {
        this.addHandler('POST', handler)
    }

    put(handler: NextApiHandler): void {
        this.addHandler('PUT', handler)
    }

    delete(handler: NextApiHandler): void {
        this.addHandler('DELETE', handler)
    }

    private addHandler(method: string, handler: NextApiHandler) {
        this.orchestrator.set(method, handler)
    }

    listener(): NextApiHandler {
        return (request: NextApiRequest, response: NextApiResponse) => {
            const listener = this.orchestrator.get(request.method);
            if (listener) return listener(request, response)
            return response.status(405).json({ message: 'Method not allowed' })
        }
    }
}
