import { LinkList, NewUserLinkList } from './LinkList'

export interface User {
    userId: number;
    name: string,
    password: string,
    linkList: LinkList,
}

export interface NewUser {
    userId: number;
    name: string,
    password: string,
    linklist: NewUserLinkList,
}