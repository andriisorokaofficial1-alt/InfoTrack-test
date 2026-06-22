export interface Item {
    id: number,
    name: string,
    category: string,
    price: number,
    inStock: boolean
};

export interface OrderItem extends Item {
    itemsInOrder: number
}

export interface State {
    order: OrderItem[]
}

export interface OrderFormData {
    firstName: string,
    lastName: string,
    email: string,
    shippingSpeed: string,
    address: string,
    city: string,
    state: string,
    ZIPCode: string | number | undefined,
    country: string,
    phoneNumber: string,
    termsConditions: boolean
}