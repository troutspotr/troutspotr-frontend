const createServer = (base, endpoint, verb, response) => {
  const server = sinon.fakeServer.create()
  server.autoRespond = true
  const DELAY_MILLISECONDS = 5
  server.autoResponseAfter = DELAY_MILLISECONDS

  const ABSOLUTE_ENDPOINT = base + endpoint
  server.respondWith(verb, ABSOLUTE_ENDPOINT, response)
}

export default createServer
