export interface LinkData {
    userId: string,
    linkListId: string,
    name: string,
    url: string,
}

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

export interface UserData {
    // ids are management by firebase via the push id system
    name: string,
    password: string,
    linkLists: {
        [key: string]: LinkListData
    },
}

export interface InitUserData {
    name: string,
    password: string,
}