import fontList from 'font-list';

export async function GET() {
    try {
        const fonts = await fontList.getFonts({ disableQuoting: true });
        return Response.json({ fonts });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
