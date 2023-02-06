import { prisma } from "@/config";

async function getHotels(){
    const hotels = prisma.hotel.findMany()
    return hotels;
}
async function getHotelById(hotelId:number) {
    const hotel = await prisma.hotel.findFirst({
        where:{
            id: hotelId
        },
        include:{
            Rooms: true
        }
    })
    
    return hotel;
}

const hotelRespository = {
    getHotels,
    getHotelById
}

export default hotelRespository;