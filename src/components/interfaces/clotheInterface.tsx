
export interface clotheInterface{
        upperbody: ClothesDetailInterface[],
        lowerbody: ClothesDetailInterface,
        shoes: ClothesDetailInterface,
        misc: ClothesDetailInterface[]
}

export interface ClothesDetailInterface {
    description: string,
    url: string
}