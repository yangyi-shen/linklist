import express from 'express';
import cors from 'cors';

import { InitUserData, UserData } from './schemas/User';
import { LinkData } from './schemas/Link';
import { createLink, createUser, getLatestLinks, getLinkListLinks, getUser, getUserLinkLists, getUserLinks } from './firebase';

const app = express();
const port = process.env.PORT || 6900;

app.use(cors());
app.use(express.json());

// user apis
app.get('/users/:userId', async (req: express.Request, res: express.Response) => {
    const userData:InitUserData = await getUser(req.params.userId);

    if (userData) {
        res.status(200).json(userData);
    } else {
        res.status(200).json(null);
    }
});

app.post('/users', async (req: express.Request, res: express.Response) => {
    const userData: UserData = req.body;

    try {
        await createUser(userData);
        
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json(error)
    }
});

// linklist endpoints
app.get('/linklists/:userId', async (req: express.Request, res: express.Response) => {
    const linkListData = await getUserLinkLists(req.params.userId);

    if (linkListData) {
        res.status(200).json(linkListData);
    } else {
        res.status(500).json(null)
    }
});

// link endpoints
app.get('/links/latest', async (req: express.Request, res: express.Response) => {
    const latestLinks = await getLatestLinks();

    if (latestLinks) {
        res.status(200).json(latestLinks)
    } else {
        res.status(500).json(null)
    }
})

app.get('/links/:linkListId', async (req: express.Request, res: express.Response) => {
    const linkListLinks = await getLinkListLinks(req.params.linkListId);

    if (linkListLinks) {
        res.status(200).json(linkListLinks)
    } else {
        res.status(500).json(null)
    }
})

app.get('/links/:userId', async (req: express.Request, res: express.Response) => {
    const userLinks = await getUserLinks(req.params.userId);

    if (userLinks) {
        res.status(200).json(userLinks)
    } else {
        res.status(500).json(null)
    }
})

app.post('/links', async (req: express.Request, res: express.Response) => {
    const linkData: LinkData = req.body;

    try {
        await createLink(linkData);

        res.status(200).json(linkData);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
