# Sass no duplicate breakpoints

Sass no duplicate breakpoints est une librairie Sass qui permet de regrouper les points de rupture.

Jusqu'à présent, lors de la création d'un point de rupture pour un sélecteur, Sass générait à chaque fois un nouveau @media, problème: il pouvait y avoir plusieurs fois un même @media. 
Le but de la librairie est de palier à ce problème en regroupant les mêmes point de rupture.

### Installation

Importez le fichier `responsive/import.scss` dans votre fichier principal sass.

    @import 'pathToResponsive/import";

### Les points de ruptures

Vous pouvez créer autant de points de rupture que vous souhaitez, pour cela il suffit d'ajouter une nouvelle entrée dans la variable `$__responsiveQuery`.

    $__responsiveQuery : (
            md-breakpoint : (
                    query : 'screen and (max-width: 768px)',
            )
    ) !default;

`md-breakpoint` correspond au nom du point de rupture. La clef `query` est la régle du point de rupture.

### Ajout d'un point de rupture à un sélecteur

L'ajout d'un point de rupture se fait à l'aide de la mixin `respond-to` qui prendre deux paramètres : en premier `le nom du point du rupture` (ex : md-breakpoint) et en second paramètre 
la liste des propriétés. 

Si le point de rupture n'existe pas dans `$__responsiveQuery`, une erreur est levée ([@error](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#error)).

**Exemple :**

    .foo{
      color: red;    
      @include respond-to(md-breakpoint, (
        color: blue,
      ));
    }
    
    .hello {
      @include respond-to(my-breakpoint, (
          background: red,
      ));
    }

**Généré :**

    .foo {
        color: red;
    }

    @media (my-breakpoint) {
        .foo{
            color: blue;
        }
        .hello {
            background: red;
        }        
    }
    
Dans le cas, ou un sélecteur aurait plusieurs fois un même point du rupture, seul les propriétés du dernier point de rupture seront généré. 

**Exemple :**

    .foo{
      @include respond-to(md-breakpoint, (
        color: blue,
      ));
      
      @include respond-to(md-breakpoint, (
        background: pink,
        position: relative,
      ));
    }
    
**Généré :**

    @media (my-breakpoint) {
        .foo{
            background: pink;
            position: relative;
        }        
    }
    
Dans l'exemple ci-dessus, seule les propriétés `background: pink; position: relative;` seront générées. Pour éviter tout problème, utilisez un seul `respond-to()` par point de rupture et sélecteur.
   
### Générer les points de rupture

La génération des points de rupture se fait à l'aide de la mixin `loadMediaQuery` qui peut prendre zéro, un ou plusieurs paramétres. Si 
aucun paramètre n'est passer à la mixin, l'ensemble des points de rupture seront générés dans l'ordre des clefs qui se trouve dans `$__responsiveQuery`.

    @include loadMediaQuery();

Si vous souhaitez charger un point de rupture spécifique ou changer l'ordre de chargement des points de ruptures (ex: approche mobile first), il vous suffit de passer la liste des points de rupture à générer.
Si un point de rupture n'existe pas, une erreur est levée.

    @include loadMediaQuery(md-breakpoint, lg-breakpoint, ...);
    
### Fonctions

- getBreakpointQuery($breakpoint)

    Permet de récupération de la clef `query` d'un point de rupture. Si le point de rupture n'existe pas, une erreur est lévée.
    
### Licence

