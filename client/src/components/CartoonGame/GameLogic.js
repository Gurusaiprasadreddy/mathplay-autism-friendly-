export const shuffleCards = (data) => {
    const shuffledDeck = [...data, ...data]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, uniqueId: Math.random(), matched: false }));
    return shuffledDeck;
};
