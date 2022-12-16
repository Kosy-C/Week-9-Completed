export interface IUser {
    id?: number,
    fullname: string,
    email: string  
    gender:string,
    phone:number,
    password?: number,
    address:string,  
}

export interface IProducts {
    id?: number,
    name: string,
    image: string,
    brand: string,
    category: string,
    description: string,
    price: number,
    countInStock: number,
    rating: number,
    numReviews: number,
}

