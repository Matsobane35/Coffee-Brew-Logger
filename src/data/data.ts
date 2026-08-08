export interface Brew {
    brew_id: number;
    beans_used: string;
    brewing_method: string;
    coffee_content: string;
    water_content: string;
    rating: number;
    notes: string;
}

export const dummyBrew: Brew = {
    brew_id: 0,
    beans_used: "",
    brewing_method: "",
    coffee_content: "",
    water_content: "",
    rating: 0,
    notes: ""
}

export const dummyBrewData: Brew[] = [
    {
    brew_id: 1,
    beans_used: "Zimbabwean Highlands",
    brewing_method: "Aeropress",
    coffee_content: "15",
    water_content: "200",
    rating: 3,
    notes: ""
    },
    {
    brew_id: 2,
    beans_used: "Nigerian Dark Roast",
    brewing_method: "Drip Coffee",
    coffee_content: "10",
    water_content: "120",
    rating: 5,
    notes: ""
    },
    {
    brew_id: 3,
    beans_used: "Italian Decaf",
    brewing_method: "V60",
    coffee_content: "20",
    water_content: "180",
    rating: 1,
    notes: ""
    }
]