export interface ResponseDataType<Data=any> {
    body:Data,
    description:string,
    status:number
}
export interface SwiperDataType{
    alt: string
    id: number
    imgSrc: string
}
export interface GroupDataType{
    desc: string,
    id: number,
    imgSrc: string,
    title: string
}

export interface NewsDataType{
    date: string,
    from: string,
    id: number,
    imgSrc: string,
    title:string
}
