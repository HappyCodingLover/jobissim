import {
  TAuthor,
  TBAuthor,
  TBBusiness,
  TBBusinessUser,
  TBComment,
  TBLinkedinToken,
  TBMessage,
  TBMessageByUser,
  TBNotification,
  TBPredictSearchUser,
  TBSignUpForm,
  TBSubTitle,
  TBUser,
  TBVideo,
  TBusiness,
  TBusinessUser,
  TComment,
  TLinkedinToken,
  TMessage,
  TMessageByUser,
  TNotification,
  TPredictSearchUser,
  TSignUpForm,
  TSubTitle,
  TUser,
  TVideo,
} from 'types';

export const authorF: (values: TBAuthor) => TAuthor = values => {
  return {
    ...values,
    firstName: values.firstname,
    lastName: values.lastname,
  };
};

export const businessF: (values: TBBusiness) => TBusiness = values => {
  return {
    ...values,
    creator: businessUserF(values.creator),
  };
};

export const businessUserF: (
  values: TBBusinessUser,
) => TBusinessUser = values => {
  return {
    ...values,
    firstName: values.firstname,
    lastName: values.lastname,
  };
};

export const commentF: (values: TBComment) => TComment = values => {
  return {
    ...values,
    author: authorF(values.author),
  };
};

export const linkedinTokenB: (
  values: TLinkedinToken,
) => TBLinkedinToken = values => {
  return {
    ...values,
    access_token: values.accessToken,
    expires_in: values.expiresIn,
  };
};

export const linkedinTokenF: (
  values: TBLinkedinToken,
) => TLinkedinToken = values => {
  return {
    ...values,
    accessToken: values.access_token,
    expiresIn: values.expires_in,
  };
};

export const messageByUserF: (
  values: TBMessageByUser,
) => TMessageByUser = values => {
  return {
    ...values,
    object: {
      ...values.object,
      author: authorF(values.object.author),
      lastMessage: {
        ...values.object.lastMessage,
        author: authorF(values.object.lastMessage.author),
      },
      participants: values.object.participants.map(authorF),
    },
    unreadMessages: values.UnreadMessages,
  };
};

export const messageF: (values: TBMessage) => TMessage = values => {
  return {
    ...values,
    author: authorF(values.author),
    readBy: values.readBy.map(authorF),
  };
};

export const notificationF: (
  values: TBNotification,
) => TNotification = values => {
  return {
    ...values,
    sender: userF(values.sender),
    user: userF(values.user),
  };
};

export const predictSearchUserF: (
  values: TBPredictSearchUser,
) => TPredictSearchUser = values => {
  return {
    ...values,
    firstName: values.firstname,
    lastName: values.lastname,
  };
};

export const signUpB: (values: TSignUpForm) => TBSignUpForm = values => {
  return {
    ...values,
    firstname: values.firstName,
    lastname: values.lastName,
    zipcode: values.zipCode,
  };
};

export const subtitleF: (values: TBSubTitle) => TSubTitle = values => {
  return {
    ...values,
    endTime: values.end_time,
    startTime: values.start_time,
  };
};

export const userB: (values: TUser) => TBUser = values => {
  return {
    ...values,
    firstname: values.firstName,
    lastname: values.lastName,
    zipcode: values.zipCode,
  };
};

export const userF: (values: TBUser) => TUser = values => {
  return {
    ...values,
    firstName: values.firstname,
    lastName: values.lastname,
    zipCode: values.zipcode,
  };
};

export const videoB: (values: TVideo) => TBVideo = values => {
  return {
    ...values,
    hashtag: values.hashTag,
    subcategory: values.subCategory,
    user: userB(values.user),
  };
};

export const videoF: (values: TBVideo) => TVideo = values => {
  return {
    ...values,
    hashTag: values.hashtag,
    subCategory: values.subcategory,
    user: userF(values.user),
  };
};
