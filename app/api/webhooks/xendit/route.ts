import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log(req);
  try {
    const body = await req.json();

    if (body.status === 'PAID') {
      //update the booking status and paymenttype

      await db.payment.update({
        where: {
          externalId: body.external_id,
        },
        data: {
          paymentType: body.payment_method,
          status: body.status,
        },
      });

      console.log(
        `Invoice successfully paid with status ${body.status} and id ${body.id}`
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing callback:', error);
    return NextResponse.json(
      { error: 'Failed to process callback' },
      { status: 500 }
    );
  }
}
