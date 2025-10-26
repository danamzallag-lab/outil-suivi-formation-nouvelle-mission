// api/airtable.js
export default async function handler(req, res) {
  // Autoriser toutes les origines (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gérer la requête OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Vérifier que c'est une requête POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // URL du webhook Airtable
    const AIRTABLE_WEBHOOK = 'https://hooks.airtable.com/workflows/v1/genericWebhook/appLyreRyfaYDIsyc/wflXZYKModO0lLrNk/wtrccVGWHC9vpY8IG';

    // Récupérer les données du formulaire
    const formData = req.body;

    console.log('📤 Envoi vers Airtable:', formData);

    // Envoyer vers Airtable
    const response = await fetch(AIRTABLE_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      console.log('✅ Succès Airtable');
      return res.status(200).json({
        success: true,
        message: 'Données envoyées avec succès'
      });
    } else {
      console.error('❌ Erreur Airtable:', response.status);
      const errorText = await response.text();
      console.error('Détails:', errorText);
      return res.status(response.status).json({
        success: false,
        error: 'Erreur lors de l\'envoi à Airtable',
        details: errorText
      });
    }
  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur serveur',
      details: error.message
    });
  }
}
