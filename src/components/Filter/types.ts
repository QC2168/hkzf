
export interface SelectStatusType {
    area: boolean;
    rentType: boolean;
    price: boolean;
    more: boolean;
}

export interface SelectedStatusValType {
    area: string;
    rentType: string;
    price: string;
    more: string[];
}

export interface TitleListType {
    title: string;
    type: keyof SelectStatusType
}

export interface ColumnsItem {
    label: string;
    value: string;
}

export interface ColumnsType {
    area: ColumnsItem[];
    rentType: ColumnsItem[];
    price: ColumnsItem[];
    more: ColumnsItem[];
}
