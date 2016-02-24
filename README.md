## SoundBoard
1.0
### Installation

##### Récuperation du dépot GIT
Une fois le projet cloné, se placer dans le repertoire :
```sh
config
```
##### Configuration et installation
Editer le fichier server.json en y spécifiant le ServerName du site.

et executer les commandes suivantes :
```sh
npm install grunt-cli -g
npm install
grunt
```

##### Environnement de développement
Executer la commande suivante :
```sh
grunt serve
```

### Edition de contenu
Pour mettre à jour les contenus du soundboard, il suffit d'éditer le fichier
```sh
www/json/global.json
```
La structure du fichier est la suivante  :

```sh
{
  "datas": [
    {
      "profile" : "test",
      "title" : "P’tit Quinquin Soundboard",
      "subtitle" : "Ecoutez les meilleures répliques de la série"
    }
  ],
  "sounds":[
  {
    "title": "Concentrez-vous<br/>Inspecteur !",
    "img_desktop": "img/bulle-2.png",
    "img_mobile": "img/bulle-2.png",
    "mp3": "sounds/bmt/bmt-bass-01.mp3",
    "tw_share": "Concentrez-vous Inspecteur !",
    "fb_share_title": "Concentrez-vous Inspecteur !",
    "fb_share_desc": "Viens découvrir ce sample sur notre SoundBoard"
  },
  {
    "title": "Les mouques à brin,<br/> elles ont peur des vaques",
    "img_desktop": "img/bulle-1.png",
    "img_mobile": "img/bulle-1.png",
    "mp3": "sounds/bmt/bmt-beats-01.mp3",
    "tw_share": "Les mouques à brin, elles ont peur des vaques",
    "fb_share_title": "Les mouques à brin, elles ont peur des vaques",
    "fb_share_desc": "Viens découvrir ce sample sur notre SoundBoard"
  },
  ....
```

### Template

Pour changer les couleurs du template, il faut aller modifier les variables SASS dans le fichier suivant :

```sh
sass/utils/_variables.scss
```