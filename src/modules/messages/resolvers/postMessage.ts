import type { Context } from 'app/graphql/context';

import { subscribers } from 'modules/dialogues/subscribers';

const postMessage = async (
  _parent: unknown,
  args: { text: string; dialogueId: number },
  { prisma, user }: Context,
) => {
  const { text, dialogueId } = args;

  const createdMessage = await prisma.message.create({
    data: {
      text,
      dialogueId,
      senderId: user!.id,
    },
  });

  const targetDialogue = await prisma.dialogue.findUnique({
    where: { id: dialogueId },
  });

  await prisma.dialogue.update({
    where: {
      id: dialogueId,
    },
    data: {
      messagesIds: [...targetDialogue!.messagesIds, createdMessage.id],
    },
  });

  subscribers.forEach(fn => fn());

  return createdMessage.id;
};

export default postMessage;
