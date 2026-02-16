export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userItems, editsOverride, newItemIds } = req.body;

    if (!userItems) {
      return res.status(400).json({ error: 'Missing userItems data' });
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_OWNER = 'Worklaf';
    const GITHUB_REPO = 'Worklaf';
    const FILE_PATH = 'TestNet_Hub/data/arc_shared_data.json';

    if (!GITHUB_TOKEN) {
      return res.status(500).json({ error: 'GitHub token not configured' });
    }

    // 1️⃣ Получаем текущий файл (SHA для обновления)
    const getResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    let sha = null;
    if (getResponse.ok) {
      const fileData = await getResponse.json();
      sha = fileData.sha;
    }

    // 2️⃣ Подготавливаем данные
    const dataToSave = {
      userItems,
      editsOverride: editsOverride || {},
      newItemIds: newItemIds || [],
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    };

    const content = Buffer.from(JSON.stringify(dataToSave, null, 2)).toString('base64');

    // 3️⃣ Создаём/обновляем файл
    const updateResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `[AUTO] Update Arc shared data - ${new Date().toLocaleString('ru')}`,
          content,
          sha: sha || undefined,
          branch: 'main'
        }),
      }
    );

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error('GitHub API Error:', errorText);
      return res.status(500).json({ 
        error: 'GitHub update failed', 
        details: errorText 
      });
    }

    const result = await updateResponse.json();

    return res.status(200).json({
      success: true,
      message: 'Data synced to GitHub',
      commit: result.commit.sha,
      url: result.content.html_url
    });

  } catch (error) {
    console.error('Sync error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
}
