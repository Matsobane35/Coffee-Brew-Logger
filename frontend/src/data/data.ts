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
