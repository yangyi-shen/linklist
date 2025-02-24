import { Link } from './Link'

export interface LinkList {
    id: number,
    userId: number,
    links: Link[],
}

export interface NewUserLinkList {
    id: number,
    userId: number,
    links: [],
}