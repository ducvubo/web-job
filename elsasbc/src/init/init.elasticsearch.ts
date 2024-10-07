// import { Client, ClientOptions } from '@elastic/elasticsearch'

// let clients: any = {}

// const instanceEventListeners = async (elasticClient) => {
//   try {
//     await elasticClient.ping()
//     console.log('Connected to Elasticsearch!')
//   } catch (error) {
//     console.error('Failed to connect to Elasticsearch:', error)
//   }
// }

// export const init = ({
//   ELASTICHSEARCH_IS_ENABLED,
//   ELASTICSEARCH_HOSTS = 'http://localhost:9200'
// }: {
//   ELASTICHSEARCH_IS_ENABLED: boolean
//   ELASTICSEARCH_HOSTS: string
// }) => {
//   if (ELASTICHSEARCH_IS_ENABLED) {
//     const clientOptions: ClientOptions = {
//       node: ELASTICSEARCH_HOSTS,
//       auth: {
//         username: 'elastic',
//         password: 'nRBYcuMUg=d=oQUG-FfS'
//       },
//       ssl: {
//         rejectUnauthorized: false
//       }
//     }
//     const elasticClient = new Client(clientOptions)
//     clients.elasticClient = elasticClient
//     instanceEventListeners(elasticClient)
//   }
// }

// export const getClients = () => clients

// const closeClients = () => {}
