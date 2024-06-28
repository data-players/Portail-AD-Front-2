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

  useEffect(() => {
    const hasSeenJoyride = localStorage.getItem('hasSeenJoyride');
    if (!hasSeenJoyride) {
      const timer = setTimeout(() => {
        if (document.querySelector('.ais-SearchBox-input')) {
          setRun(true);
        }
      }, 1);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDidacticielClick = () => {
    setRun(false);
    setKey(prevKey => prevKey + 1);
    setRun(true);
  };

  const handleJoyrideCallback = (data) => {
    const { status, action } = data;
    const finishedStatuses = ['finished', 'skipped'];

    if (finishedStatuses.includes(status) || action === 'skip') {
      localStorage.setItem('hasSeenJoyride', 'true');
      setRun(false);
    }
  };

  const steps = [
    {
      target: '.ais-SearchBox-input',
      content: (
        <>
          <h3>Barre de recherche</h3>
          <p>Vous pouvez taper un ou plusieurs mots-clés, les résultats de recherche sont mis à jour directement.</p>
          <p>Pour chercher un terme ou expression stricte, ajoutez des guillemets autour. Ex: "projet alimentaire territorial</p>
          <p>Si votre mot-clé comporte une faute d'orthographe ou s'approche d'un autre mot, l'outil le reconnaîtra et remontera les résultats qui s'approchent de votre intention de recherche</p>
        </>
      ),
      placement: 'bottom',
      styles: {
        options: {
          width: 300,
        },
      },
    },
    {
      target: '.filtersGroup',
      content: (
        <>
          <h3>Filtres</h3>
          <p>Vous pouvez sélectionner un ou plusieurs filtres, qui sont combinés pour actualiser la liste des résultats</p>
          <p>Tous les contenus apparaissant dans les résultats de recherche proviennent de centres de ressources ou d'observatoires reconnus et qualifiés par nos soins, pour lesquels une convention de partenariat et de mise à disposition des données a été mise en place.</p>
        </>
      ),
      placement: 'right',
      styles: {
        options: {
          width: 300,
        },
      },
    },
    {
      target: '#explore-link',
      content: (
        <>
          <h3>Explorer</h3>
        </>
      ),
      placement: 'right',
      styles: {
        options: {
          width: 300,
        },
      },
    },
  ];



  const routing = {
    router: history({
      // windowTitle({ query }) {
      //   return query ? `Search results for "${query}"` : 'Search';
      // },
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

 
  return (
    <>
      <InstantSearch indexName="documents" searchClient={searchClient} routing={routing}>
        <Configure attributesToSnippet={['description:150', 'hasKeyword:4']} />
        <div className="searchContainer">
          <div className="sideFilters">
            <div className="filtersHeader">
              <span className="subtitle2">Rechercher</span>
              <ClearRefinements translations={{
                resetButtonText: 'Réinitialiser les filtres',
              }} classNames={{
                button: 'clearRefinementsButton',
              }} />
            </div>
            <div className="filtersGroup">
              <hr style={{ margin: '10px 0', opacity: 0.5 }} />
              <CollapsibleFilter title="Département" initialRouteState={initialRouteState} attribute="hasDepartment" icon={<DepartementIcon />}>
                <RefinementList attribute="hasDepartment" showMore={true} showMoreLimit={1000} translations={{
                  showMoreButtonText({ isShowingMore }) {
                    return isShowingMore ? 'Afficher moins' : 'Afficher plus';
                  },
                  noResults: 'Aucun résultat'
                }}
                  classNames={{
                    showMore: 'showMoreButton',
                  }} />
              </CollapsibleFilter>
              <hr style={{ margin: '10px 0', opacity: 0.5 }} />
              <CollapsibleFilter title="Thèmatique" initialRouteState={initialRouteState} attribute="hasTopic" icon={<ThematiqueIcon />}>
                <RefinementList attribute="hasTopic" showMore={true} showMoreLimit={1000} translations={{
                  showMoreButtonText({ isShowingMore }) {
                    return isShowingMore ? 'Afficher moins' : 'Afficher plus';
                  },
                  noResults: 'Aucun résultat'
                }}
                  classNames={{
                    showMore: 'showMoreButton',
                  }} />
              </CollapsibleFilter>
              <hr style={{ margin: '10px 0', opacity: 0.5 }} />
              <CollapsibleFilter title="Tag" initialRouteState={initialRouteState} attribute="hasKeyword" icon={<TagIcon />}>
                <RefinementList attribute="hasKeyword" showMore={true} showMoreLimit={1000} translations={{
                  showMoreButtonText({ isShowingMore }) {
                    return isShowingMore ? 'Afficher moins' : 'Afficher plus';
                  },
                  noResults: 'Aucun résultat'
                }}
                  classNames={{
                    showMore: 'showMoreButton',
                  }} />
              </CollapsibleFilter>
            </div>
          </div>
          <div className="searchPanel">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <InputWithStyledPlaceholder className="searchBoxWithStyledPlaceholder"
                placeholder={(
                  <div className="placeholderText"><strong>Commencer votre recherche</strong> <span className="placeholderText-subtitle">(taper un mot clé ou une phrase)</span></div>
                )}
              >
                <SearchBox className="searchBox" />
              </InputWithStyledPlaceholder>
              <DidacticielIcon className="didacticiel-icon" onClick={handleDidacticielClick} />
            </div>
            <div>
              <Stats 
                translations={{
                  rootElementText({ nbHits, processingTimeMS, nbSortedHits, areHitsSorted }) {
                    return `${nbHits.toLocaleString()} resultats trouvé en ${processingTimeMS.toLocaleString()}ms`;
                  }
                }} 
                classNames={{
                  root: 'customStats'
                }}
              />
            </div>
            <div className="searchResult" >
              <InfiniteHits
                hitComponent={Hit}
                classNames={{
                  item: 'itemCustom'
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
            backgroundColor: 'black',
            color: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          },
          buttonNext: {
            backgroundColor: '#28a745',
            borderRadius: '4px',
            color: 'white',
          },
          buttonBack: {
            marginRight: 10,
            color: '#28a745',
          },
          buttonSkip: {
            backgroundColor: '#ddd',
            borderRadius: '4px',
            color: '#333',
          },
        }}
      />
    </>
  );
};

export default SearchComponents;
