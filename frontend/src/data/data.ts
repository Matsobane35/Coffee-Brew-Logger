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
    rating: 1,
    notes: ""
}

export const ratingColours = ["", "#f83737", "#f58931", "#e4d82d", "#89d434", "#07ad1d"]