import { NextResponse } from 'next/server';
import { searchForDiseasePrecaution, searchForMedicine } from '@/lib/utils';

export async function GET(request: Request) {
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
    const body = await request.json();
    const intent = body.queryResult.intent.displayName

    let res;
    if (intent == 'FindMedicine') res = searchForMedicine(body.queryResult?.parameters?.medicine?.toLowerCase());
    else if (intent == 'FindPrecaution') res = searchForDiseasePrecaution(body.queryResult?.parameters?.diseases?.toLowerCase())
    else res = {
      fulfillmentMessages: [
        {
          text: { text: ['Something wrong!'] },
        },
      ]
    }
    

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