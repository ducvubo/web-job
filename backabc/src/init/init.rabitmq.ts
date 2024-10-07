import amqp from 'amqp-connection-manager'

export const initRabbitMQ = () => {
  const connection = amqp.connect([process.env.URL_RABBITMQ])
  return connection
}
