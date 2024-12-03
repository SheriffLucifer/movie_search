export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    const truncated = text.slice(0, maxLength).split(' ');
    truncated.pop();
    return `${truncated.join(' ')}...`;
};
