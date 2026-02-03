import { google } from 'googleapis';

export interface NewsItem {
    row_number: number;
    position: number;
    title: string;
    link: string;
    domain: string;
    source: string;
    date: string;
    date_utc: string;
    snippet: string;
    thumbnail: string;
    block_position: number;
}

const SPREADSHEET_ID = '1xl4oVgfOeb_lnuMlDJ42FfCk-CZRPw60-HI_6OZvbeQ';
const RANGE = 'Sheet1!A:Z';

export async function fetchGoogleSheetData(): Promise<NewsItem[]> {
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!serviceAccountEmail || !privateKey) {
        console.error('Google Service Account credentials missing in .env.local');
        return [];
    }

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: serviceAccountEmail,
                private_key: privateKey,
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
        });

        const values = response.data.values;
        console.log(`Fetched ${values?.length || 0} rows from Google Sheets`);

        if (!values || values.length < 2) {
            return [];
        }

        const headers = values[0];
        const rows = values.slice(1);

        return rows.map((row: any[], index: number) => {
            const item: any = {};
            headers.forEach((header: string, i: number) => {
                const value = row[i];
                // Map header names to interface properties
                const key = header.toLowerCase().replace(/ /g, '_');

                // Type conversion for numbers
                if (['row_number', 'position', 'block_position'].includes(key)) {
                    item[key] = value ? parseInt(value) : (key === 'row_number' ? index + 2 : 0);
                } else {
                    item[key] = value || '';
                }
            });

            // Ensure row_number exists even if not in sheet
            if (!item.row_number) item.row_number = index + 2;

            return item as NewsItem;
        });
    } catch (error) {
        console.error('Failed to fetch from Google Sheets via Service Account:', error);
        return [];
    }
}
