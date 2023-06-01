import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const rawData = await fs.promises.readFile(DATA_FILE_PATH);
      const data = JSON.parse(rawData);

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ error: 'Invalid data' });
      return;
    }

    if (req.headers['content-type'] !== 'application/json') {
      res.status(415).json({ error: 'Unsupported Media Type' });
      return;
    }

    try {
      const rawData = await fs.promises.readFile(DATA_FILE_PATH);
      const data = JSON.parse(rawData);

      const newData = req.body;
      for (const key in newData) {
        data[key] = newData[key];
      }

      await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(data));

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
