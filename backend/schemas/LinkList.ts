import { LinkData } from './Link'

export interface LinkListData {
    userId: string,
    name: string,
    links: {
        [key: string]: LinkData
    },
}

export interface InitLinkListData {
    userId: string,
    name: string,
}