import { NextRequest, NextResponse } from 'next/server';
import { redis, INCIDENT_KEY } from '@/lib/kv';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const data = await redis.get(INCIDENT_KEY);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching incident data:', error);
    return NextResponse.json({ error: 'Failed to fetch incident data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const body = await request.json();
    const { lastIncidentDate, daysWithoutIncident } = body;
    
    const data = {
      lastIncidentDate,
      daysWithoutIncident,
    };
    
    await redis.set(INCIDENT_KEY, data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error saving incident data:', error);
    return NextResponse.json({ error: 'Failed to save incident data' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    await redis.del(INCIDENT_KEY);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting incident data:', error);
    return NextResponse.json({ error: 'Failed to delete incident data' }, { status: 500 });
  }
}
