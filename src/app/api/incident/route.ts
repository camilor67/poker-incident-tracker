import { NextRequest, NextResponse } from 'next/server';
import { kv, INCIDENT_KEY } from '@/lib/kv';

export async function GET() {
  try {
    const data = await kv.get(INCIDENT_KEY);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching incident data:', error);
    return NextResponse.json({ error: 'Failed to fetch incident data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lastIncidentDate, daysWithoutIncident } = body;
    
    const data = {
      lastIncidentDate,
      daysWithoutIncident,
    };
    
    await kv.set(INCIDENT_KEY, data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error saving incident data:', error);
    return NextResponse.json({ error: 'Failed to save incident data' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await kv.del(INCIDENT_KEY);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting incident data:', error);
    return NextResponse.json({ error: 'Failed to delete incident data' }, { status: 500 });
  }
}
