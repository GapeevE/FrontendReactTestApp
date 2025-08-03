export interface PhoneData {
    producer: string;
    year: number;
    diagonal: number;
    country: string;
    memory: number;
    refresh: number;
    NFC: boolean;
    ESIM: boolean;
    wireless: boolean;
    price: number;
    image: string;
    name: string;
}

export const phonesData: PhoneData[] = [
    {
        producer: "Apple",
        year: 2023,
        diagonal: 6.1,
        country: "USA",
        memory: 128,
        refresh: 60,
        NFC: true,
        ESIM: true,
        wireless: true,
        price: 20799,
        image: "phones/phone.png",
        name: "iPhone 15"
    },
    {
        producer: "Samsung",
        year: 2023,
        diagonal: 6.8,
        country: "South Korea",
        memory: 256,
        refresh: 120,
        NFC: true,
        ESIM: true,
        wireless: true,
        price: 21199,
        image: "phones/phone2.png",
        name: "Galaxy S23 Ultra"
    },
    {
        producer: "Xiaomi",
        year: 2022,
        diagonal: 6.67,
        country: "China",
        memory: 128,
        refresh: 120,
        NFC: true,
        ESIM: false,
        wireless: true,
        price: 20499,
        image: "phones/phone3.png",
        name: "Redmi Note 12 Pro"
    },
    {
        producer: "Google",
        year: 2023,
        diagonal: 6.7,
        country: "USA",
        memory: 128,
        refresh: 120,
        NFC: true,
        ESIM: true,
        wireless: true,
        price: 899,
        image: "phones/phone.png",
        name: "Pixel 8 Pro"
    },
    {
        producer: "OnePlus",
        year: 2023,
        diagonal: 6.7,
        country: "China",
        memory: 256,
        refresh: 120,
        NFC: true,
        ESIM: true,
        wireless: true,
        price: 20699,
        image: "phones/phone2.png",
        name: "OnePlus 11"
    },
    {
        producer: "Nokia",
        year: 2021,
        diagonal: 6.5,
        country: "Finland",
        memory: 64,
        refresh: 60,
        NFC: false,
        ESIM: false,
        wireless: false,
        price: 20199,
        image: "phones/phone3.png",
        name: "Nokia C21"
    }
];