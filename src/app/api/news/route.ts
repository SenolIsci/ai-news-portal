import { NextResponse } from 'next/server';
import { fetchGoogleSheetData } from '@/utils/googleSheets';

export async function GET() {
    try {
        const data = await fetchGoogleSheetData();
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}
