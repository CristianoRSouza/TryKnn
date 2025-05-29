// import { PubSub } from "@google-cloud/pubsub";

// const pubSubClient = new PubSub();

// export const sendUserdata = async (userData: any) => {
//   const topicName = "nome-do-topico"; // Substitua pelo nome do seu tópico
//   const data = JSON.stringify(userData);

//   try {
//     const messageId = await pubSubClient.topic(topicName).publish(data);
//     console.log(`Mensagem publicada com o ID: ${messageId}`);
//   } catch (error) {
//     console.error(`Erro ao publicar mensagem: ${error}`);
//   }
// };
