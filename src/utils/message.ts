import moment from 'moment';

import {env} from 'config';
import {TAuthor, TMessage, TMessageByUser} from 'types';

import {reduceString} from './string';

export const formatMessage = (message: string, isAuthor: boolean) => {
  if (message.includes('///***partage***///')) return `publication envoyé`;

  if (
    message.includes(
      '$2y$10$LnC33zuG3.LO29n7z7xsa.nUsZgP4OsQIQGJWb4nsmXaGiwxLFrcK',
    )
  )
    return isAuthor ? `brouillon` : ``;

  const lastMessage = message.replace(/\n/g, ' ');

  return reduceString(lastMessage, 40);
};

export const normalizeMessagingData = (
  {object: data}: TMessageByUser,
  userId: number,
) => {
  let allParticipants = [];
  const participants = data.participants || [];
  const authorInParticipants = participants.find(
    (participant: TAuthor) => participant.id === data.author.id,
  );
  if (authorInParticipants) {
    allParticipants = [...data.participants];
  } else {
    allParticipants = [...data.participants, {...data.author}];
  }
  const contacts = allParticipants.filter(
    participant => participant.id !== userId,
  );
  const fullName = contacts.map(contact => contact.fullName).join(' ');

  return {
    contact: {
      avatar:
        contacts.length > 1
          ? data.author.avatar
          : contacts.length === 0
          ? data.author.avatar
          : contacts[0].avatar,
      fullName,
    },
    id: data.id,
    isAuthor: data.author.id === userId,
    lastMessage: data.lastMessage,
  };
};

export const normalizeMessagesData = (data: TMessage) => {
  return {
    _id: data.id,
    audio: data.attachmentType?.includes('audio')
      ? `${env.uploadFileUrl}/messageries/${data.attachment}`
      : undefined,
    createdAt: moment(data.createdAt).toDate(),
    image: data.attachmentType?.includes('image')
      ? `${env.uploadFileUrl}/messageries/${data.attachment}`
      : undefined,
    text: data.content,
    user: {
      _id: data.author.id,
      avatar: `${env.uploadFileUrl}/avatars/${data.author.avatar}`,
      name: data.author.fullName,
    },
    video: data.attachmentType?.includes('video')
      ? `${env.uploadFileUrl}/messageries/${data.attachment}`
      : undefined,
  };
};
