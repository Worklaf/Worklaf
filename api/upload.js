export default async function handler(req, res) {
  try {
    const token = process.env.GH_TOKEN;
    const { content } = req.body;

    const owner = "Worklaf";
    const repo = "Worklaf";
    const path = "TestNet_Hub/data/arc_user_items.json";

    const fileResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const fileData = await fileResp.json();

    const updateResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Обновление arc_user_items.json",
        content,
        sha: fileData.sha
      })
    });

    const result = await updateResp.json();
    res.status(200).json({ status: "ok", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
