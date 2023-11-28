import moment from 'moment';

export const formatTime = (date: string) => {
  const today = moment();
  const lastDay = moment(date);

  const seconds = today.diff(lastDay, 'seconds');
  if (seconds < 60) {
    return `à l'instant`;
  }

  const minutes = today.diff(lastDay, 'minutes');
  if (minutes < 60) {
    return `il y a ${minutes} mn`;
  }

  const hours = today.diff(lastDay, 'hours');
  if (hours < 24) {
    return `il y a ${hours} h`;
  }

  const days = today.diff(lastDay, 'days');
  if (days < 7) {
    return `il y a ${days} j`;
  }

  const weeks = today.diff(lastDay, 'weeks');
  if (weeks < 53) {
    return `il y a ${weeks} sem`;
  }

  const years = today.diff(lastDay, 'years');
  return `il y a ${years} ans`;
};
