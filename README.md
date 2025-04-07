# INSTALL
ouvrir 2 terminal.


dans le terminal react, depuis le rep punk/my-app
> npm install
> yarn start

dans le terminal nodeJs, depuis le rep punk/my-app
> node server.js



Pour Chapeau/Cheveux
dans chapeaux on a un "hairPack", qui est le nom du repertoire du pack de cheveux dispo pour ce chapeau. (1, 2, 3)
en gros si hairPack = 1, les cheveux dispo se trouvent dans .../hair/1/nomDeLelement
hairpack 1 = cops et biker
hairpack 2 = casquette et chapeau avec le dessus "fermé"
hairpack 3 = bandeau (pas bandana, car fermé), et tout les chapeau non fermé au dessus (couronne etc...)

pour hairpack 2, quand on crée des cheveux, on supprime la parti des cheveux qui est au dessus du bas du chapeau...
(prend hat_cap en template)

pour hairpack3, on supprime juste la parti masquée

Pour Bouche/Barbe
barbe possede attribut "type"
si type =  beard... on decale le truc de la largeur et de la profondeur de la barbe
si pas bear, genre, goat etc... touche pas.

pour la bouche y a un truc "customZ"...

HAT COP ET BIKER on pas le hairPack id adequat.