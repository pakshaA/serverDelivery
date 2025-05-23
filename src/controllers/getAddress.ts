import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

// Тип для ответа Dadata
type DadataResponse = {
    suggestions: Array<{
        value: string;
        unrestricted_value: string;
        data: Record<string, any>;
    }>;
};

export const getAddress = async (req: Request, res: Response) => {
    try {
        const { query } = req.query;
        
        // Проверка параметров
        if (!query || typeof query !== 'string') {
            return res.status(400).json({ error: 'Параметр query обязателен' });
        }
        
        // Проверка наличия API-ключа
        if (!process.env.DADATA_KEY) {
            throw new Error('Отсутствует DADATA_KEY в .env');
        }
        
        // Запрос к Dadata
        const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${process.env.DADATA_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ query, count: 10 }) // Добавим лимит результатов
        });
        
        if (!response.ok) {
            throw new Error(`Dadata API error: ${response.statusText}`);
        }
        
        const data: DadataResponse = await response.json();
        
        // Отправляем только нужные данные клиенту
        res.json({
            results: data.suggestions.map(suggestion => ({
                value: suggestion.value,
                unrestricted_value: suggestion.unrestricted_value
            }))
        });
        
    } catch (error) {
        console.error('Ошибка в getAddress:', error);
        res.status(500).json({ 
            error: error instanceof Error ? error.message : 'Неизвестная ошибка'
        });
    }
};