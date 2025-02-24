import { LinkList } from './LinkList'

export interface User {
    // ids are management by firebase via the push id system
    name: string,
    password: string,
    linkList: LinkList,
}

export interface InitUserData {
    name: string,
    password: string,
}