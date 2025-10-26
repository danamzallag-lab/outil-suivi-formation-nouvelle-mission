# 📊 GUIDE CONFIGURATION AIRTABLE - Suivi de Formation

## 🎯 Objectif
Ce guide vous permet de configurer Airtable pour recevoir et analyser les retours de mise en pratique des apprenants.

---

## ÉTAPE 1 : CRÉER LA BASE AIRTABLE

### 1.1 Création de la base
1. Connectez-vous à [Airtable](https://airtable.com)
2. Cliquez sur **"+ Create"**
3. Nommez la base : **"Formation Entretiens - Suivi Apprenants"**

### 1.2 Structure de la table principale : "Suivi Pratiques"

Créez une table avec les champs suivants :

| Nom du champ | Type | Configuration | Description |
|--------------|------|---------------|-------------|
| `ID` | Autonumber | - | ID auto-généré |
| `Nom` | Single line text | - | Nom de l'apprenant |
| `Prénom` | Single line text | - | Prénom de l'apprenant |
| `Email` | Email | - | Email de l'apprenant |
| `Officine` | Single line text | - | Structure de rattachement |
| `Date Entretien` | Date | Date only | Date de la mise en pratique |
| `Type Entretien` | Single select | Options ci-dessous | Type d'entretien réalisé |
| `Évaluation` | Single select | 1, 2, 3, 4, 5 | Note de 1 (difficile) à 5 (facile) |
| `Difficultés` | Long text | - | Difficultés rencontrées |
| `Gestion Difficultés` | Long text | - | Comment les difficultés ont été gérées |
| `Observations` | Long text | - | Observations libres |
| `Besoins Suivi` | Single select | Options ci-dessous | Besoin d'accompagnement |
| `Date Envoi` | Date | Include time | Date et heure de soumission |
| `Statut Suivi` | Single select | Options ci-dessous | Statut du suivi formateur |
| `Notes Formateur` | Long text | - | Notes du formateur |

#### Options pour "Type Entretien" :
- Femme enceinte
- Opioïdes
- AOD
- AVK
- Asthme

#### Options pour "Besoins Suivi" :
- Non, je suis à l'aise
- Oui - rappel théorique
- Oui - pratique supplémentaire
- Oui - débriefing individuel
- Non renseigné

#### Options pour "Statut Suivi" :
- 🆕 Nouveau (couleur bleue)
- 👀 À traiter (couleur orange)
- ✅ Traité (couleur verte)
- 📞 À contacter (couleur rouge)

---

## ÉTAPE 2 : CONFIGURER LE WEBHOOK

### 2.1 Créer l'automation
1. Dans votre base, cliquez sur **"Automations"** (en haut à droite)
2. Cliquez sur **"Create automation"**
3. Nommez-la : **"Réception suivi apprenants"**

### 2.2 Configurer le trigger
1. Sélectionnez **"When a webhook is received"**
2. Cliquez sur **"Generate webhook URL"**
3. **COPIEZ L'URL** (exemple : `https://hooks.airtable.com/workflows/v1/genericWebhook/...`)
4. Collez cette URL dans le fichier HTML à la ligne :
   ```javascript
   webhookUrl: 'VOTRE_WEBHOOK_URL_AIRTABLE_ICI'
   ```

### 2.3 Configurer l'action "Create record"
1. Ajoutez une action **"Create record"**
2. Sélectionnez la table **"Suivi Pratiques"**
3. Mappez les champs :

```
Nom → webhook.data.nom
Prénom → webhook.data.prenom
Email → webhook.data.email
Officine → webhook.data.officine
Date Entretien → webhook.data.dateEntretien
Type Entretien → webhook.data.typeEntretien
Évaluation → webhook.data.evaluation
Difficultés → webhook.data.difficultes
Gestion Difficultés → webhook.data.gestionDifficultes
Observations → webhook.data.observations
Besoins Suivi → webhook.data.besoinsSuivi
Date Envoi → webhook.data.dateEnvoi
Statut Suivi → "🆕 Nouveau" (valeur fixe)
```

### 2.4 Tester
1. Cliquez sur **"Test step"**
2. Ouvrez le formulaire HTML
3. Remplissez et soumettez un test
4. Vérifiez que les données arrivent dans Airtable

---

## ÉTAPE 3 : CRÉER LES VUES

### Vue 1 : "📋 Tous les retours"
- Vue par défaut
- Triée par "Date Envoi" décroissante
- Tous les champs visibles

### Vue 2 : "🆕 Nouveaux retours"
- Filtre : `Statut Suivi` = "🆕 Nouveau"
- Triée par "Date Envoi" décroissante
- **Utilisez cette vue pour les nouveaux retours à traiter**

### Vue 3 : "📞 À contacter en priorité"
- Filtre : `Évaluation` ≤ 2 OU `Besoins Suivi` contient "Oui"
- Triée par "Date Envoi" décroissante
- **Vue prioritaire pour identifier les apprenants en difficulté**

### Vue 4 : "👤 Par apprenant"
- Groupée par "Nom"
- Triée par "Date Entretien" croissante
- **Pour suivre la progression individuelle**

### Vue 5 : "💊 Par type d'entretien"
- Groupée par "Type Entretien"
- Triée par "Date Entretien" décroissante
- **Pour analyser les difficultés par thématique**

### Vue 6 : "🏢 Par officine"
- Groupée par "Officine"
- Triée par "Date Envoi" décroissante
- **Pour comparer les structures**

---

## ÉTAPE 4 : CHAMPS CALCULÉS (FORMULAS)

### Champ : "Niveau de difficulté"
```
Type : Formula
Format : Single line text

IF({Évaluation} = "1", "🔴 Très difficile",
IF({Évaluation} = "2", "🟠 Difficile",
IF({Évaluation} = "3", "🟡 Moyen",
IF({Évaluation} = "4", "🟢 Facile",
IF({Évaluation} = "5", "🔵 Très facile", "")))))
```

### Champ : "Nombre d'entretiens"
```
Type : Count (linked records)
Si vous créez une table "Apprenants" séparée
```

### Champ : "Alerte"
```
Type : Formula
Format : Checkbox

OR(
  {Évaluation} <= 2,
  FIND("Oui", {Besoins Suivi}) > 0
)
```
→ Coche automatiquement si l'apprenant nécessite un suivi

---

## ÉTAPE 5 : AUTOMATISATIONS AVANCÉES

### Automation 1 : Email de confirmation apprenant
**Trigger** : Quand un enregistrement est créé
**Action** : Envoyer un email

```
À : {Email}
Objet : ✅ Votre retour a bien été reçu

Bonjour {Prénom},

Merci pour votre retour sur la mise en pratique de l'entretien "{Type Entretien}".

Votre formateur a bien reçu vos informations :
- Date de pratique : {Date Entretien}
- Ressenti : {Niveau de difficulté}
- Difficultés : {Difficultés}

Nous reviendrons vers vous prochainement pour le suivi.

Cordialement,
L'équipe Formation
```

### Automation 2 : Alerte formateur pour difficultés
**Trigger** : Quand un enregistrement est créé
**Condition** : Si `Évaluation` ≤ 2 OU `Besoins Suivi` contient "Oui"
**Action** : Envoyer un email au formateur

```
À : votre-email@exemple.com
Objet : 🚨 Suivi prioritaire requis - {Prénom} {Nom}

APPRENANT EN DIFFICULTÉ DÉTECTÉ

Apprenant : {Prénom} {Nom}
Email : {Email}
Entretien : {Type Entretien}
Évaluation : {Niveau de difficulté}
Besoins : {Besoins Suivi}

Difficultés rencontrées :
{Difficultés}

Gestion :
{Gestion Difficultés}

→ Action recommandée : Contacter rapidement
```

### Automation 3 : Rapport hebdomadaire
**Trigger** : Tous les lundis à 9h
**Action** : Envoyer un rapport récapitulatif

```
Objet : 📊 Rapport hebdomadaire - Suivi formation

SEMAINE DU [DATE]

📈 Statistiques :
- Nombre de retours : [COUNT]
- Entretiens réalisés : [BREAKDOWN PAR TYPE]
- Apprenants en difficulté : [COUNT WHERE Évaluation ≤ 2]

🔴 À traiter en priorité :
[LISTE DES APPRENANTS AVEC Alerte = TRUE]

🎯 Actions recommandées :
- Débriefings individuels à planifier
- Rappels théoriques nécessaires
```

---

## ÉTAPE 6 : DASHBOARD FORMATEUR

### Créer une Interface (Airtable Interface Designer)

#### Section 1 : Vue d'ensemble
- **Nombre total de retours** (Number card)
- **Retours cette semaine** (Number card avec filtre date)
- **Apprenants à suivre** (Number card avec filtre Alerte)

#### Section 2 : Répartition par entretien
- **Graphique en barres** : Nombre de retours par type d'entretien
- **Graphique en camembert** : Répartition des niveaux de difficulté

#### Section 3 : Difficultés récurrentes
- **Tableau** : Top 5 des difficultés les plus citées
- Utilisez l'agrégation de texte sur le champ "Difficultés"

#### Section 4 : Liste des retours prioritaires
- **Liste filtrée** : Évaluation ≤ 2 ou Besoins Suivi = Oui
- Affichage : Nom, Prénom, Type Entretien, Niveau de difficulté
- Tri : Date Envoi décroissante

#### Section 5 : Progression individuelle
- **Vue tableau** groupée par Apprenant
- Permet de voir l'évolution par personne

---

## ÉTAPE 7 : ANALYSE AVEC L'IA AIRTABLE

### Prompt 1 : Analyse des difficultés
```
Analyse les difficultés rencontrées par les apprenants et identifie :
1. Les 5 difficultés les plus fréquentes
2. Les entretiens qui posent le plus de problèmes
3. Les corrélations entre type d'entretien et difficultés
4. Les apprenants qui ont besoin d'un suivi immédiat

Présente sous forme de rapport structuré avec recommandations.
```

### Prompt 2 : Suivi individuel
```
Pour l'apprenant [NOM PRENOM], génère un rapport de suivi incluant :
- Nombre d'entretiens réalisés
- Progression (évolution des notes entre le 1er et le dernier entretien)
- Points forts et points à améliorer
- Recommandations personnalisées
- Plan d'action pour les prochaines semaines
```

### Prompt 3 : Comparaison officines
```
Compare les performances entre les différentes officines :
- Nombre de retours par officine
- Moyenne des évaluations par officine
- Difficultés spécifiques à chaque structure
- Identification des bonnes pratiques à partager

Format : tableau comparatif + synthèse
```

### Prompt 4 : Plan de formation
```
À partir des difficultés identifiées, propose :
- Un plan de formation complémentaire
- Les thématiques à renforcer en priorité
- Des ateliers pratiques ciblés
- Des ressources pédagogiques adaptées

Priorise par urgence et impact.
```

---

## ÉTAPE 8 : INTÉGRATION AVEC D'AUTRES OUTILS

### Slack (notifications en temps réel)
1. Dans Automations → Ajouter action "Send Slack message"
2. Configurer le channel de notification
3. Message : Nouveau retour de [Prénom] sur entretien [Type]

### Google Sheets (export données)
1. Sync automatique Airtable → Google Sheets
2. Permet de créer des graphiques personnalisés
3. Partage facilité avec l'équipe

### Calendrier (planification des débriefings)
1. Créer un champ "Date débriefing" (type Date)
2. Synchroniser avec Google Calendar
3. Automatiser les rappels

---

## ÉTAPE 9 : PARTAGE ET PERMISSIONS

### Partager avec les apprenants (lecture seule)
1. Créer une vue filtrée par email
2. Chaque apprenant voit uniquement ses retours
3. Permissions : "Read only"

### Partager avec l'équipe pédagogique
1. Accès "Editor" pour les formateurs
2. Accès "Commenter" pour les observateurs
3. Dashboard partagé via Interface

---

## 📊 MÉTRIQUES CLÉS À SUIVRE

### Indicateurs de performance
- **Taux de participation** : % d'apprenants qui soumettent des retours
- **Score moyen par entretien** : Évaluation moyenne par type
- **Taux de réussite** : % d'apprenants avec note ≥ 4
- **Temps de traitement** : Délai entre envoi et "Traité"

### Signaux d'alerte
- Évaluation ≤ 2 : Difficulté majeure
- 3 retours consécutifs ≤ 3 : Besoin de soutien
- Même difficulté récurrente : Gap de formation
- Pas de retour pendant 2 semaines : Relancer l'apprenant

---

## 🔒 SÉCURITÉ ET RGPD

### Points importants
1. **Webhook sécurisé** : Ne jamais partager l'URL publiquement
2. **Données personnelles** : Emails = données sensibles
3. **Consentement** : Informer les apprenants du traitement des données
4. **Conservation** : Définir une durée (recommandé : durée formation + 1 an)
5. **Droit d'accès** : Permettre aux apprenants de voir/modifier/supprimer leurs données

### Clause RGPD à ajouter
```html
<div style="margin: 20px 0; font-size: 0.9rem; color: #666;">
    ✅ En soumettant ce formulaire, j'accepte que mes données soient traitées 
    dans le cadre de ma formation et conservées pendant [durée]. 
    Je peux exercer mes droits d'accès, modification et suppression 
    en contactant [email].
</div>
```

---

## ✅ CHECKLIST DE MISE EN PLACE

- [ ] Base Airtable créée avec tous les champs
- [ ] Webhook configuré et URL copiée dans le HTML
- [ ] Test d'envoi effectué et validé
- [ ] Vues créées (Nouveaux, À contacter, Par apprenant, etc.)
- [ ] Champs calculés configurés
- [ ] Automations créées (confirmation + alerte)
- [ ] Dashboard formateur configuré
- [ ] Permissions configurées
- [ ] Clause RGPD ajoutée
- [ ] Documentation remise à l'équipe

---

## 🆘 DÉPANNAGE

### Le webhook ne fonctionne pas
1. Vérifier que l'URL est correcte dans le HTML
2. Tester avec webhook.site d'abord
3. Vérifier la console du navigateur (F12)
4. Vérifier les logs de l'automation Airtable

### Les données n'arrivent pas correctement
1. Vérifier le mapping des champs dans l'automation
2. Tester l'automation manuellement
3. Vérifier les types de champs (Date, Single select, etc.)

### Problème de CORS
1. Le webhook Airtable accepte toutes les origines
2. Si problème : utiliser un proxy (Vercel, Netlify Functions)

---

## 📞 SUPPORT

Pour toute question :
- Documentation Airtable : https://support.airtable.com
- Communauté : https://community.airtable.com
- Support Airtable : via l'interface

---

**✅ Votre outil de suivi est prêt !**

Vous pouvez maintenant suivre efficacement la progression de vos apprenants et identifier rapidement ceux qui ont besoin d'accompagnement.
