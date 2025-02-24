import { LinkListData } from './LinkList'

export interface UserData {
    // ids are management by firebase via the push id system
    name: string,
    password: string,
    linkList: {
        [key: string]: LinkListData
    },
}