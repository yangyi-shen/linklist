import { Link } from './Link'

export interface LinkList {
    linkListId: number,
    userId: number,
    links: Link[],
}

export interface NewUserLinkList {
    linkListId: number,
    userId: number,
    links: [],
}