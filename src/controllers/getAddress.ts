import dotenv from 'dotenv';
dotenv.config();

export const getAddress = async (query: string) => {
    const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${process.env.DADATA_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ query })
    });

    if (!response.ok) throw new Error('Ошибка при запросе к Dadata');

    const data = await response.json();
    return data;
};
