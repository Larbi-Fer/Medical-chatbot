import { NextResponse } from 'next/server';
import { searchForMedicine } from '@/lib/utils';

export async function GET(request: Request) {
  // For example, fetch data from your DB here
  const data = {
    status: 'OK'
  };
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const searchTerm = body.queryResult?.parameters?.medicine?.toLowerCase();

    if (!searchTerm) {
      return NextResponse.json(
        { error: 'No medicine name provided.' },
        { status: 400 }
      );
    }

    const res = searchForMedicine(searchTerm);
    return NextResponse.json(res)
  } catch (error) {
    console.error('Error reading CSV:', error);
    return NextResponse.json(
      { error: 'Failed to process request.' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}