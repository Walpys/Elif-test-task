export const formatDate = (dateString: string) => {
  if (!dateString) return 'Recent';

  try {
    const normalizedDate = dateString.trim().replace(' ', 'T');
    
    const date = new Date(normalizedDate);


    if (isNaN(date.getTime())) {
      const fallbackDate = new Date(normalizedDate + 'Z');
      if (isNaN(fallbackDate.getTime())) return 'Recent';
      return format(fallbackDate);
    }

    return format(date);
  } catch (e) {
    return 'Recent';
  }
};

const format = (d: Date) => {
  return d.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};