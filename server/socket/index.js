module.exports = io => {

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('new-message', newMessage => {
      socket.broadcast.emit('new-message', newMessage)
    })

  })
}
