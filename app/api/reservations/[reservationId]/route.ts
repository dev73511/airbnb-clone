import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

interface IParams {
    reservationId?: string;
}

export async function DELETE(
    request: Request,
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const {reservationId} = params;

    if(!reservationId || typeof reservationId !== 'string'){
        throw new Error('Invalid ID');
    }

    /** 
     *  we want to delete a reservation who is either the creator of reservation
     *  or the creator of listing that the reservation is on.
     * */

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {userId: currentUser.id},
                {listing: { userId: currentUser.id }}
            ]
        }
    });

    return NextResponse.json(reservation);
}