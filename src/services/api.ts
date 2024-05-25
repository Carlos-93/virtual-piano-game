import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/game-results';

export default async function processGameResult(finalScore: number, user_id: string, game_id: string, time: string): Promise<void> {
    try {
        await axios.post(apiUrl, {
            score: finalScore,
            user_id: user_id,
            game_id: game_id,
            time: time,
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error processing game result:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
    }
}