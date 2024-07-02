# Projet de serveur WebRTC avec Socket.io

Ce projet est un serveur WebRTC utilisant Socket.io pour la gestion des connexions en temps réel. Il est écrit en JavaScript et utilise npm pour la gestion des dépendances.

## Caractéristiques

- Le serveur est basé sur Express.js et utilise http pour créer le serveur HTTP.
- Socket.io est utilisé pour la gestion des connexions en temps réel.
- Les événements Socket.io sont utilisés pour gérer les offres, les réponses, les candidats, les déconnexions et les événements de départ des pairs.

## Installation

Pour installer les dépendances du projet, exécutez la commande suivante :

```bash
npm install
```

## Exécution

Pour démarrer le serveur, exécutez la commande suivante :

```bash
node server.js
```

Le serveur sera alors en écoute sur le port 3000 ou sur le port défini dans la variable d'environnement PORT.