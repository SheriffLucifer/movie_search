export const truncateTitle = (title: string): string => {
    const words = title.split(' ');
    if (words.length <= 2) {
        return title;
    }
    return `${words.slice(0, 2).join(' ')}...`;
};
