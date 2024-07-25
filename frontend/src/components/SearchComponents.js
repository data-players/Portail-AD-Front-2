import React, { useState, useEffect } from 'react';
import {
  InstantSearch,
  InfiniteHits,
  SearchBox,
  Stats,
  RefinementList,
  Configure,
  ClearRefinements
} from "react-instantsearch";
import { history } from 'instantsearch.js/es/lib/routers';
import qs from 'qs';
import searchClient from '../search/searchClient';
import CollapsibleFilter from './CollapsibleFilter';
import Hit from './Hit';
import "instantsearch.css/themes/algolia-min.css";
import Joyride from 'react-joyride';
import './SearchComponents.css';
import { ReactComponent as ThematiqueIcon } from '../assets/logos/common/SVG/thématique.svg';
import { ReactComponent as TagIcon } from '../assets/logos/common/SVG/tag.svg';
import { ReactComponent as DepartementIcon } from '../assets/logos/common/SVG/departement.svg';
import { ReactComponent as DidacticielIcon } from '../assets/logos/common/SVG/didacticiel.svg';
import InputWithStyledPlaceholder from './InputWithStyledPlaceholder';

const SearchComponents = () => {

  const [run, setRun] = useState(false);
  const [key, setKey] = useState(0);
  const [initialRouteState, setInitialRouteState] = useState({});
  const [stepIndex, setStepIndex] = useState(0);
  const [steps, setSteps] = useState([
    {
      target: '.ais-SearchBox-input',
      content: (
        <>
          <h3>Barre de recherche</h3>
          <hr/>
          <p>Vous pouvez taper un ou plusieurs mots-clés, les résultats de recherche sont mis à jour directement.</p>
          <hr/>
          <p>Pour chercher un terme ou expression stricte, ajoutez des guillemets autour. Ex: "projet alimentaire territorial"</p>
          <hr/>
          <p>Si votre mot-clé comporte une faute d'orthographe ou s'approche d'un autre mot, l'outil le reconnaîtra et remontera les résultats qui s'approchent de votre intention de recherche</p>
        </>
      ),
      placement: 'bottom',
      styles: {
        options: {
          width: 300,
        },
      },
      disableBeacon: false,
    },
    {
      target: '.filtersGroup',
      content: (
        <>
          <h3>Filtres</h3>
          <hr/>
          <p>Tous les contenus proposés proviennent de plateformes partenaires. Vous pouvez sélectionner un ou plusieurs filtres, qui sont combinés, afin d'affiner votre recherche. Le nombre à côté de chaque filtre indique le nombre de résultats qui correspondent à ce filtre.</p>
          <hr/>
          <p>Les "Départements" permettent de filtrer les résultats par rapport à leur emplacement géographique. Les "Thématiques" sont des catégories ou classements issus des plateformes partenaires, d'où leur nombre important. Les "Tags" sont des mots-clés utilisés par les plateformes partenaires pour améliorer la caractérisation et le référencement des contenus.</p>
          <hr/>
          <p>Nous vous invitons à tester plusieurs types de filtres et de combinaisons pour mieux comprendre le fonctionnement de l'outil. À tout moment, vous pouvez réinitialiser les filtres en cliquant sur le bouton à côté du titre "Rechercher", en haut de la page.</p>
        </>
      ),
      placement: 'right',
      styles: {
        options: {
          width: 300,
        },
      },
      disableBeacon: false,
    },
    {
      target: '.sidebar',
      content: (
        <>
          <h3>Barre de navigation</h3>
          <hr/>
          <p>Cette barre est un menu de navigation. En plus de la présente page "Rechercher", vous pouvez cliquer sur "Explorer", qui permet d'afficher toutes les thématiques et une carte des départements, afin de faciliter la navigation dans les contenus de la plateforme.</p> 
          <hr/>
          <p>En bas de cette barre, une icône "Documentation" vous amène à un autre site contenant un mode d'emploi de l'outil, ainsi que des précisions sur le projet, son écosystème et des questions fréquentes.</p>
        </>
      ),
      placement: 'right',
      styles: {
        options: {
          width: 300,
        },
      },
      disableBeacon: false,
    },
  ]);

  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleDidacticielMouseEnter = (evt) => {
    setTooltipContent("Didacticiel");
    setTooltipPosition({ x: evt.clientX, y: evt.clientY });
  };

  const handleMouseMove = (evt) => {
    setTooltipPosition({ x: evt.clientX+10, y: evt.clientY + 80 });
  };

  const handleDidacticielMouseLeave = () => {
    setTooltipContent("");
  };

  const handleDidacticielClick = () => {
    setRun(false);
    setKey(prevKey => prevKey + 1);
    setStepIndex(0);
    setSteps(prevSteps => prevSteps.map(step => ({ ...step, disableBeacon: true })));
    setRun(true);
  };

  const handleJoyrideCallback = (data) => {
    const { status, action, index,lifecycle } = data;
    const finishedStatuses = ['finished', 'skipped'];

    if (finishedStatuses.includes(status) || action === 'skip') {
      localStorage.setItem('hasSeenJoyride', 'true');
      setRun(false);
    }
    else if (action === 'next' && lifecycle==='complete') {
      setStepIndex(index + 1);
    } else if (action === 'prev' && lifecycle==='complete') {
      setStepIndex(index - 1);
    }

  };

  const routing = {
    router: history({
      createURL({ qsModule, routeState, location }) {
        const { protocol, hostname, port = '', pathname, hash } = location;
        const portWithPrefix = port === '' ? '' : `:${port}`;
        /* eslint-disable no-unused-vars */
        const [hashPath, hashQuery = ''] = hash.slice(1).split('?');
        /* eslint-enable no-unused-vars */
        const queryParameters = qsModule.stringify(routeState);
        return `${protocol}//${hostname}${portWithPrefix}${pathname}#${hashPath}?${queryParameters}`;
      },
      parseURL({ qsModule, location }) {
        /* eslint-disable no-unused-vars */
        const [hashPath, hashQuery = ''] = location.hash.slice(1).split('?');
        /* eslint-enable no-unused-vars */
        const routeState = qsModule.parse(hashQuery);
        return routeState;
      },
      write({ qsModule, routeState, location }) {
        const [hashPath] = location.hash.slice(1).split('?');
        const queryParameters = qsModule.stringify(routeState);
        window.history.pushState({}, '', `${location.pathname}${location.search}#${hashPath}?${queryParameters}`);
      },
      onUpdate(callback) {
        window.addEventListener('hashchange', () => {
          const [, hashQuery = ''] = window.location.hash.slice(1).split('?');
          const routeState = qs.parse(hashQuery);
          callback(routeState);
        });
      }
    }),
    stateMapping: {
      stateToRoute(uiState) {
        const indexUiState = uiState['documents'];
        return indexUiState;
      },
      routeToState(routeState) {
        setInitialRouteState(routeState);
        return {
          documents: routeState,
        };
      },
    },
  };


  useEffect(() => {
    const hasSeenJoyride = localStorage.getItem('hasSeenJoyride');
    if (!hasSeenJoyride) {
      setRun(true);
      setStepIndex(0);
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <InstantSearch indexName="documents" searchClient={searchClient} routing={routing}>
        <Configure attributesToSnippet={['description:130', 'hasKeyword:4']} />
        <div className="searchContainer">
          <div className="sideFilters">
            <div className="filtersHeader">
              <span className="subtitle2">Rechercher</span>
              <div className="body3 bold">
                <ClearRefinements translations={{
                  resetButtonText: 'Réinitialiser les filtres',
                }} classNames={{
                  button: 'clearRefinementsButton',
                }} />
              </div>
            </div>
            <div className="filtersGroup">
              <hr style={{ margin: '10px 0', opacity: 0.5 }} />
              <CollapsibleFilter title="Départements" initialRouteState={initialRouteState} attribute="hasDepartment" icon={<DepartementIcon />}>
                <RefinementList attribute="hasDepartment" showMore={true} showMoreLimit={1000} translations={{
                  showMoreButtonText({ isShowingMore }) {
                    return isShowingMore ? 'Afficher moins' : 'Afficher plus';
                  },
                  noResults: 'Aucun résultat'
                }}
                  classNames={{
                    showMore: 'showMoreButton body3 bold',
                  }} />
              </CollapsibleFilter>
              <hr style={{ margin: '10px 0', opacity: 0.5 }} />
              <CollapsibleFilter title="Thématiques" initialRouteState={initialRouteState} attribute="hasTopic" icon={<ThematiqueIcon />}>
                <RefinementList attribute="hasTopic" showMore={true} showMoreLimit={1000} translations={{
                  showMoreButtonText({ isShowingMore }) {
                    return isShowingMore ? 'Afficher moins' : 'Afficher plus';
                  },
                  noResults: 'Aucun résultat'
                }}
                  classNames={{
                    showMore: 'showMoreButton body3 bold',
                  }} />
              </CollapsibleFilter>
              <hr style={{ margin: '10px 0', opacity: 0.5 }} />
              <CollapsibleFilter title="Tags" initialRouteState={initialRouteState} attribute="hasKeyword" icon={<TagIcon />}>
                <RefinementList attribute="hasKeyword" showMore={true} showMoreLimit={1000} translations={{
                  showMoreButtonText({ isShowingMore }) {
                    return isShowingMore ? 'Afficher moins' : 'Afficher plus';
                  },
                  noResults: 'Aucun résultat'
                }}
                  classNames={{
                    showMore: 'showMoreButton body3 bold',
                  }} />
              </CollapsibleFilter>
            </div>
          </div>
          <div className="searchPanel">
            <div className="searchBoxContainer">
              <InputWithStyledPlaceholder className="searchBoxWithStyledPlaceholder body2"
                placeholder={(
                  <div className="placeholderText"><strong>Commencer votre recherche</strong> <span className="placeholderText-subtitle">(taper un mot clé ou une phrase)</span></div>
                )}
              >
                <SearchBox className="searchBox" />
              </InputWithStyledPlaceholder>
              <DidacticielIcon className="didacticiel-icon" onClick={handleDidacticielClick} onMouseEnter={handleDidacticielMouseEnter} onMouseLeave={handleDidacticielMouseLeave} />
              {tooltipContent && (
                <div
                  style={{
                    position: 'fixed',
                    top: tooltipPosition.y - 50,
                    left: tooltipPosition.x - 50,
                    backgroundColor: 'white',
                    padding: '5px',
                    border: '1px solid black',
                    borderRadius: '3px',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tooltipContent}
                </div>
              )}
            </div>
            <div className="customStats body3">
              <Stats 
                translations={{
                  rootElementText({ nbHits, processingTimeMS, nbSortedHits, areHitsSorted }) {
                    return `${nbHits.toLocaleString()} resultats trouvés en ${processingTimeMS.toLocaleString()}ms`;
                  }
                }}
              />
            </div>
            <div className="searchResult body3 bold" >
              <InfiniteHits
                hitComponent={Hit}
                classNames={{
                  item: 'itemCustom',
                  loadMore : 'showMoreButton'
                }}
                translations={{
                  showPreviousButtonText: 'Charger les resultats précedents',
                  showMoreButtonText: 'Charger plus de résultats',
                }}
              />
            </div>
          </div>
        </div>
      </InstantSearch >
      <Joyride
        key={key}
        steps={steps}
        run={run}
        stepIndex={stepIndex}
        continuous={true}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        callback={handleJoyrideCallback}
        locale={{ back: 'Retour', close: 'Fermer', last: 'Fin', next: 'Suivant', open: 'Ouvrire le didacticiel', skip: 'Passer' }}
        styles={{
          options: {
            zIndex: 10000,
          },
          tooltip: {
            backgroundColor: '#343A33',
            color: 'white',
            border: '1px solid #ddd',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          },
          buttonNext: {
            backgroundColor: '#B9FF66',
            borderRadius: '4px',
            color: 'black',
          },
          buttonBack: {
            marginRight: 10,
            color: '#black',
            borderRadius: '4px',
            backgroundColor: '#B9FF66',
          },
          buttonSkip: {
            backgroundColor: '#ddd',
            borderRadius: '4px',
            color: '#333',
          },
          tooltipContent: {
            padding: '0px 0px',
          },
        }}
      />
    </>
  );
};

export default SearchComponents;
