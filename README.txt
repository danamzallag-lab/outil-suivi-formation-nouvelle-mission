# 🎓 SYSTÈME DE SUIVI DE FORMATION - PRÊT À L'EMPLOI

## ✅ CONFIGURATION COMPLÈTE

Votre système est **100% configuré et prêt à être utilisé** !

---

## 📦 CONTENU DU PACKAGE

### 🎯 Fichiers principaux (PRÊTS À UTILISER)

1. **outil-suivi-formation.html** 
   - ✅ Webhook Airtable déjà configuré
   - ✅ Prêt à être déployé
   - ✅ Connexion automatique à votre base "Suivi Pratiques"

2. **dashboard-formateur.html**
   - Dashboard de visualisation avec graphiques
   - Affiche des données de démonstration
   - Personnalisable selon vos besoins

### 📚 Documentation

3. **guide-configuration-airtable-suivi.md**
   - Guide complet de configuration
   - Vues recommandées
   - Automations à créer
   - Prompts IA Airtable

4. **README-DEMARRAGE-RAPIDE.md**
   - Guide de démarrage en 3 étapes
   - Workflow quotidien
   - Dépannage

---

## 🚀 DÉMARRAGE IMMÉDIAT (5 MINUTES)

### ÉTAPE 1 : Finaliser l'automation Airtable ✅

Votre webhook est déjà créé : 
```
https://hooks.airtable.com/workflows/v1/genericWebhook/appLyreRyfaYDIsyc/wflXZYKModO0lLrNk/wtrccVGWHC9vpY8IG
```

**Il vous reste juste à configurer l'action "Créer une entrée"** :

1. Dans votre automation Airtable, après le trigger webhook
2. Ajoutez une action : **"Créer une entrée"**
3. Sélectionnez votre table : **"Suivi Pratiques"**
4. Mappez les champs comme suit :

```
Nom               → webhook.data.nom
Prénom            → webhook.data.prenom
Email             → webhook.data.email
Officine          → webhook.data.officine
Date Entretien    → webhook.data.dateEntretien
Type Entretien    → webhook.data.typeEntretien
Évaluation        → webhook.data.evaluation
Difficultés       → webhook.data.difficultes
Gestion Difficultés → webhook.data.gestionDifficultes
Observations      → webhook.data.observations
Besoins Suivi     → webhook.data.besoinsSuivi
Date Envoi        → webhook.data.dateEnvoi
Statut Suivi      → "🆕 Nouveau" (valeur fixe)
```

5. **Activez l'automation** (toggle ON en haut à droite)

### ÉTAPE 2 : Tester le formulaire 🧪

1. Ouvrez le fichier **outil-suivi-formation.html** dans votre navigateur
2. Remplissez le formulaire avec des données de test
3. Cliquez sur "Envoyer mon retour"
4. ✅ Vérifiez que les données arrivent dans votre base Airtable

### ÉTAPE 3 : Déployer en ligne 🌐

**Option A - Netlify Drop (RECOMMANDÉ - 2 minutes)**

1. Allez sur https://app.netlify.com/drop
2. Glissez-déposez le fichier **outil-suivi-formation.html**
3. Récupérez l'URL générée (ex: https://mon-suivi-formation.netlify.app)
4. Partagez cette URL avec vos apprenants

**Option B - Votre propre hébergement**

Uploadez le fichier HTML sur votre serveur FTP ou dans votre LMS.

---

## 📊 STRUCTURE AIRTABLE REQUISE

Assurez-vous que votre table "Suivi Pratiques" contient ces champs :

| Champ | Type | Options |
|-------|------|---------|
| Nom | Single line text | - |
| Prénom | Single line text | - |
| Email | Email | - |
| Officine | Single line text | - |
| Date Entretien | Date | Date uniquement |
| Type Entretien | Single select | Femme enceinte, Opioïdes, AOD, AVK, Asthme |
| Évaluation | Single select | 1, 2, 3, 4, 5 |
| Difficultés | Long text | - |
| Gestion Difficultés | Long text | - |
| Observations | Long text | - |
| Besoins Suivi | Single select | Non, Oui - rappel théorique, Oui - pratique, Oui - débriefing |
| Date Envoi | Date | Avec heure |
| Statut Suivi | Single select | 🆕 Nouveau, 👀 À traiter, ✅ Traité, 📞 À contacter |
| Notes Formateur | Long text | - |

---

## 🎨 PERSONNALISATION RAPIDE

### Changer les couleurs du formulaire

Ouvrez **outil-suivi-formation.html** et modifiez la ligne 13 :

```css
/* Actuel : violet/mauve */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Exemples d'autres palettes : */

/* Bleu médical */
background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);

/* Vert santé */
background: linear-gradient(135deg, #10b981 0%, #059669 100%);

/* Orange dynamique */
background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
```

### Ajouter votre logo

Ligne 89 du HTML, ajoutez avant le titre :

```html
<img src="votre-logo.png" alt="Logo" style="max-width: 200px; margin-bottom: 20px;">
```

---

## 🤖 AUTOMATIONS RECOMMANDÉES

### 1️⃣ Email de confirmation automatique

**Trigger** : Lorsqu'une entrée est créée  
**Action** : Envoyer email

```
À : {Email}
Objet : ✅ Votre retour a bien été reçu

Bonjour {Prénom},

Merci pour votre retour sur la mise en pratique de l'entretien "{Type Entretien}".

Votre formateur a bien reçu vos informations et reviendra vers vous prochainement.

Cordialement,
L'équipe Formation
```

### 2️⃣ Alerte pour difficultés

**Trigger** : Lorsqu'une entrée est créée  
**Condition** : Si Évaluation ≤ 2  
**Action** : Envoyer email au formateur

```
À : votre-email@exemple.com
Objet : 🚨 Apprenant en difficulté - {Prénom} {Nom}

ALERTE : Un apprenant nécessite un suivi prioritaire

Apprenant : {Prénom} {Nom}
Email : {Email}
Entretien : {Type Entretien}
Note : {Évaluation}/5

Difficultés :
{Difficultés}

→ Action recommandée : Contacter rapidement
```

---

## 📱 CRÉER UN QR CODE

Pour faciliter l'accès au formulaire :

1. Une fois déployé, copiez l'URL de votre formulaire
2. Allez sur https://www.qr-code-generator.com
3. Collez l'URL
4. Téléchargez le QR Code
5. Imprimez et affichez dans votre salle de formation

---

## 🔍 VUES AIRTABLE RECOMMANDÉES

Créez ces vues dans votre base pour un suivi optimal :

### Vue "🆕 Nouveaux retours"
- Filtre : Statut Suivi = "🆕 Nouveau"
- Tri : Date Envoi décroissant

### Vue "⚠️ Alertes prioritaires"
- Filtre : Évaluation ≤ 2 OU Besoins Suivi contient "Oui"
- Tri : Date Envoi décroissant

### Vue "👤 Par apprenant"
- Groupé par : Nom
- Tri : Date Entretien croissant

### Vue "💊 Par entretien"
- Groupé par : Type Entretien
- Tri : Date Envoi décroissant

---

## 🛠️ DÉPANNAGE

### Le formulaire ne s'envoie pas

✅ **Vérifications** :
1. L'automation Airtable est-elle activée (toggle ON) ?
2. L'action "Créer une entrée" est-elle bien configurée ?
3. Ouvrez la console du navigateur (F12) pour voir les erreurs
4. Vérifiez les logs de l'automation dans Airtable

### Les données n'arrivent pas correctement

✅ **Vérifications** :
1. Le mapping des champs correspond-il exactement ?
2. Les types de champs sont-ils corrects (Date, Single select, etc.) ?
3. Les options du Single select existent-elles dans Airtable ?

### Message d'erreur CORS

✅ **Solution** :
Les webhooks Airtable acceptent toutes les origines. Si vous avez ce problème, c'est probablement un autre souci. Testez d'abord en local (double-clic sur le fichier HTML).

---

## 📞 SUPPORT

### Airtable
- Documentation : https://support.airtable.com
- Communauté : https://community.airtable.com

### Problème technique
1. Consultez le guide-configuration-airtable-suivi.md
2. Vérifiez la section Dépannage
3. Testez avec des données simplifiées

---

## ✅ CHECKLIST AVANT LANCEMENT

- [ ] Automation Airtable créée et activée
- [ ] Action "Créer une entrée" configurée avec mapping complet
- [ ] Test d'envoi effectué avec succès
- [ ] Données bien reçues dans Airtable
- [ ] Formulaire déployé en ligne (Netlify ou autre)
- [ ] URL partagée avec les apprenants
- [ ] Automations d'emails configurées (optionnel)
- [ ] Vues Airtable créées
- [ ] QR Code créé et affiché (optionnel)

---

## 🎉 VOTRE SYSTÈME EST PRÊT !

Vous avez maintenant un système professionnel de suivi de formation :

✅ Formulaire moderne et mobile-friendly  
✅ Connexion automatique à Airtable  
✅ Dashboard de visualisation  
✅ Documentation complète  

**Prochaine étape** : Lancez votre première session de formation !

---

## 📧 INFORMATIONS TECHNIQUES

**Webhook Airtable** : Configuré et connecté  
**Base** : appLyreRyfaYDIsyc  
**Workflow** : wflXZYKModO0lLrNk  
**Table** : Suivi Pratiques

---

**Besoin d'aide ?** Consultez les guides inclus dans ce package.

**Bonne formation ! 🚀**
