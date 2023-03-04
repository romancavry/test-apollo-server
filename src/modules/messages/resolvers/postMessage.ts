import { subscribers } from 'modules/dialogues';

const postMessage = async (
  _parent: unknown,
  args: { text: string, dialogueId: number },
  { prisma }: Context
) => {
  const { text } = args;
  
  const createdMessage = await prisma.message.create({
    data: {
      text,
      dialogueId: 1, // TODO
      senderId: 2, // TODO
    },
  })

  subscribers.forEach(fn => fn());

  return createdMessage.id;
};

export default postMessage;
