import { LinkList, NewUserLinkList } from './LinkList'

export interface User {
    id: number;
    name: string,
    password: string,
    linkList: LinkList,
}

export interface NewUser {
    id: number;
    name: string,
    password: string,
    linklist: NewUserLinkList,
}