# Initial file of Read me by IsDimitrova 😎

# Prérequis
Un client Git (soit le client de son IDE, soit un client indépendant)

Un serveur Git commun (ici Github)

Au moins un développeur

Un relecteur. Le relecteur ne travaille pas nécessairement dans la même équipe projet que le développeur, et peut avoir un niveau d'expérience différent. Un développeur avec 20 ans d'expérience peut relire le code d'un stagiaire, et réciproquement..

# Démarche
Récupérer le dernier état de la branche d'intégration du projet (i.e. develop) : git checkout develop

Créer une nouvelle branche depuis cette branche d'intégration : git checkout -b my-feature

Commiter localement les modifications : git add puis git commit

Pousser les commits de cette branche sur le serveur distant : git push

Une fois le développement terminé, rebaser sur la branche d'intégration si elle a évoluée pendant le développement de la branche feature (sinon des conflits de fusion risquent d'empêcher son intégration).

Dans Gitlab, créer une demande de fusion (alias merge request) à destination de la branche source (e.g. develop) et l'affecter à la personne qui doit faire la relecture. 

Traiter la demande de fusion suivant la conduite décrite dans le chapitre Relecture de code.

Suivant la branche ciblée, réaliser des tests complémentaires sur le résultat de cette intégration.

# Organisation Git  Flow
Généralement, le cycle de vie de nos branches Git et les flux de travail associés à nos applications s'inspirent fortement du célèbre gitflow standard.

Notre Gitflow est expliqué sur une page dédiée : Git workflow .

Il existe 2 catégories de branches :

permanentes

** main est la branche de stabilisation des versions prêtes à déployer sur l'environnement de production. 
** integration est la branche de stabilisation des versions prêtes à déployer sur l'environnement de recette. (on ne le fait pas ici )
** develop est une branche permanente de travail receptable des dernières évolutions pour déploiement sur l’environnement d'intégration.
** support-{version} sont des branches assurant le support immédiat d'une version en production antérieure au dernier tag de la branche master. Ces branches sont issues du tag correspondant à la version à corriger/supporter.

éphémères

** Les branches feature permettent de réaliser une fonctionnalité (de taille très variable) de façon isolée aux branches permanentes. Un ou plusieurs développeurs peuvent y travailler simultanément. Si la tâche est trop importante, elle peut être découpée en plusieurs sous-branches au périmètre plus réduit qui seront intégrées au fur et à mesure sur la branche principale du développement. Les branches feature sont issues et intégrées dans la branche develop ou une autre branche "feature".
** Les branches hotfix permettent de corriger la dernière version stable directement sur la branche master sans attendre une stabilisation de la branche develop. Les branches hotfix sont issues de la branche master et intégrées à la fois dans la branche master et la branche develop afin d'assurer une correction homogène et éviter toute régression.
** La branche integration permet d'isoler un état de la branche develop en vue de stabiliser une version dans la branche master. Ainsi, des correctifs supplémentaires peuvent être ajoutés afin d'assurer cette stabilité. Ces correctifs doivent être reportés sur la branche develop. La branche integration est issue de la branche develop et intégrée dans la branche master.

:exclamation: Comme leur catégorie l'indique, les branches éphémères doivent être supprimés une fois intégrées/fusionnées dans une branche permanente.

:warning: Lorsque la branche develop est stable et a été testée en amont, celle-ci est souvent directement intégrée dans la branche master sans passer par la branche integration. Si des correctifs sont finalement nécessaires (suite à une dernière relecture), ceux-ci doivent être alors réalisés et intégrés via la branche integration. Pousser des commits directement sur une branche permanente est strictement interdit (car contrevenant au principe de la revue de code).

:information_source: Il existe des exceptions à ce modèle pour certains types de projets comme celui-ci (purement documentaire) qui traitent de livrables qui ne sont pas déployés en Production.
Les branches permanentes develop et support-* trouvant moins leur utilité sur ces projets non-applicatifs.

Messages de commit
Format
Le format des messages de commit suit la convention "Conventional Commits".

Langue des messages de commit
Les messages de commit sont en anglais. Les modules qui souhaient une autre langue doivent le mentionner dans README.md.

Portée (scope) du commit
La portée du commit est une information optionnelle. Si elle n’est pas applicable il ne faut pas la mentionner.

Mauvais exemple.


chore(): convert spaces to tabs
Meilleur exemple.


chore: convert spaces to tabs
Temps de la ligne de résumé
La ligne de la ligne de résumé (la première) est écrite à l’impératif présent. Un moyen simple d'écrire une phrase à l’impératif présent est de s’imaginer le préfixe “This commit will …”. Par exemple ici “This commit will convert spaces to tabs”.
