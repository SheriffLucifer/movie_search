export const truncateTitle = (title: string): string => {
    const words = title.split(' ');
    if (words.length <= 3) {
        return title;
    }
    return `${words.slice(0, 3).join(' ')}...`;
};
