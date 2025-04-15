import fs from 'fs';
import fetch from 'node-fetch'; // if using Node < 18, run: npm install node-fetch
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables into process.env

const API_URL = 'http://localhost:1337/api/categories';
const API_TOKEN = process.env.API_TOKEN_FULL_ACCESS;

async function seedCategories() {
  const raw = fs.readFileSync('./seed/categories.json', 'utf-8'); // reads file as string
  const categories = JSON.parse(raw); // parses string to array of objects

  for (const category of categories) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
        // 'Authorization': 'Bearer 488f799a1972e9969b8a77aa56777683ae555a8c1bf7716b55401afaca31125c588d2ba958dd8488d055cbcd80052294e571e67cc03f0b9f96353bb3c41e4a24e4a44a07fb6f480d6a712c77675359586ede824c983ce306edd4c3d8c91a2bad711fcfc4eb844ccaab36397e8fd4ac3df72cdbd80a961203ce7f8c1ea3db7cf1'
      },
      body: JSON.stringify(category),
    });

    const data = await res.json();

    if (res.ok) {
      console.log(`✅ Created: ${data.data?.name || category.name}`);
    } else {
      console.error(`❌ Failed: ${category.name}`, data?.error || data);
    }
  }

  console.log('🎉 Done seeding categories!');
}

seedCategories();
