import { getUser, getLinklist } from '../firebase';

// this file runs a quick test on every read firebase function to give me safety of mind

async function testGetUser() {
    const userId = '-OK0KYFSW5DwLPaQBEjp'; // user id from yyshen user
    const user = await getUser(userId);

    console.log('\ndetails of yyshen user:')
    console.log(user);
}

async function testGetLinkList() {
    const userId = '-OK0KYFSW5DwLPaQBEjp'; // user id from yyshen user
    const linkListId = 'main'; // main linklist that every account has
    const linkList = await getLinklist(userId, linkListId);

    console.log('\nlinklist of yyshen user:')
    console.log(linkList);
}

await testGetUser();
await testGetLinkList();