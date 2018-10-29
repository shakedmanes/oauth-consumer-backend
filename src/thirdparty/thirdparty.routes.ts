// thirdparty.routes

import { Router } from 'express';
import { ThirdpartyController } from './thirdparty.controller';

const thirdpartyRouter = Router();

// Gets the folder contents from the resource server api
thirdpartyRouter.get('/files', async (req, res) => {
  const token = (req.session) ? req.session.token.token.access_token : null;
  if (!token) return res.send(500).send('Token not exists');

  const folderContents = await ThirdpartyController.getFolderContents(token);

  if (folderContents) {
    return res.status(200).send(folderContents);
  }

  return res.status(500).send('API Error');
});

// Gets specific file from the resource server api
thirdpartyRouter.get('/files/:filename', async (req, res) => {
  const token = (req.session) ? req.session.token.token.access_token : null;
  const filename = req.params.filename;
  if (!token) return res.send(500).send('Token not exists');
  if (!filename) return res.send(400).send('Filename query parameter is missing.');

  const specificFile = await ThirdpartyController.getSpecificFile(token, filename);

  if (specificFile) {
    return res.status(200).send(specificFile);
  }

  return res.status(500).send('API Error');
});

export default thirdpartyRouter;
