import { LinkList } from './LinkList'

export interface User {
    id: number;
    name: string,
    password: string,
    linkList: LinkList,
}