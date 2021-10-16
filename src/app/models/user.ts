export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    selected?: boolean;
    editable?: boolean;
}