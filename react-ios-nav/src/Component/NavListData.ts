interface NavListItem {
    title: string;
    to: string;
}

export interface NavListGroup {
    title: string;
    items: NavListItem[];
}