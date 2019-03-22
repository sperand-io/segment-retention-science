import { MyIntegration } from './integration'
import { Server } from '@segment/integration-sdk/lib/server'

const { PORT = 3000 } = process.env

const server = new Server(MyIntegration)
server.listen(PORT)
