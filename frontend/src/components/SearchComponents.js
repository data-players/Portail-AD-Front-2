import React, {useState,useEffect } from 'react';
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




const SearchComponents = () => {

  useEffect(() => {
    const timer = setTimeout(() => {
      if (document.querySelector('.ais-SearchBox-input')) {
        setRun(true);
      }
    }, 1); // Délai de 500 ms pour s'assurer que les éléments sont montés
    return () => clearTimeout(timer);
  }, []);



  const [run, setRun] = useState(false);
  const [initialRouteState, setInitialRouteState] = useState({});

  const steps = [
    {
      target: '.ais-SearchBox-input',
      content : (
        <>
          <h1>Barre de recherche</h1>
          <p>Vous pouvez taper un ou plusieurs mots-clés, les résultats de recherche sont mis à jour directement.</p>
          <p>Pour chercher un terme ou expression stricte, ajoutez des guillemets autour. Ex: “projet alimentaire territorial</p>
          <p>Si votre mot-clé comporte une faute d’orthographe ou s’approche d’un autre mot, l’outil le reconnaîtra et remontera les résultats qui s’approchent de votre intention de recherche</p>
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
      target: '.filter-container',
      content : (
        <>
          <h1>Filtres</h1>
          <p>Vous pouvez sélectionner un ou plusieurs filtres, qui sont combinés pour actualiser la liste des résultats</p>
          <p>Tous les contenus apparaissant dans les résultats de recherche proviennent de centres de ressources ou d’observatoires reconnus et qualifiés par nos soins, pour lesquels une convention de partenariat et de mise à disposition des données a été mise en place.</p>
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
      windowTitle({ query }) {
        return query ? `Search results for "${query}"` : 'Search';
      },
      createURL({ qsModule, routeState, location }) {
        const { protocol, hostname, port = '', pathname, hash } = location;
        const portWithPrefix = port === '' ? '' : `:${port}`;
        // eslint-disable-next-line no-unused-vars
        const [hashPath, hashQuery = ''] = hash.slice(1).split('?');
        const queryParameters = qsModule.stringify(routeState);
        return `${protocol}//${hostname}${portWithPrefix}${pathname}#${hashPath}?${queryParameters}`;
      },
      parseURL({ qsModule, location }) {
        // eslint-disable-next-line no-unused-vars
        const [hashPath, hashQuery = ''] = location.hash.slice(1).split('?');
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
        console.log('stateToRoute')
        const indexUiState = uiState['documents'];
        return indexUiState;

      },
      routeToState(routeState) {
        console.log('routeToState',routeState)
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
        <Configure attributesToSnippet={['description:150']} />
        <SearchBox className="searchBox" />
        <Stats />
        <ClearRefinements />
        <div style={{ display: 'flex' }}>
          <div className="sideFilters" style={{ flexBasis: '30%', paddingRight: '20px' }}>
            <CollapsibleFilter title="Département" initialRouteState={initialRouteState} attribute="hasDepartment">
              <RefinementList attribute="hasDepartment" showMore={true} showMoreLimit={1000} />
            </CollapsibleFilter>
            <CollapsibleFilter title="Thème" initialRouteState={initialRouteState} attribute="hasTopic">
              <RefinementList attribute="hasTopic" showMore={true} showMoreLimit={1000} />
            </CollapsibleFilter>
            <CollapsibleFilter title="Mots clef" initialRouteState={initialRouteState} attribute="hasKeyword">
              <RefinementList attribute="hasKeyword" showMore={true} showMoreLimit={1000} />
            </CollapsibleFilter>
            <CollapsibleFilter title="Sources" initialRouteState={initialRouteState} attribute="hasDataSource">
              <RefinementList attribute="hasDataSource" />
            </CollapsibleFilter>
          </div>
          <div className="searchResult">
            <InfiniteHits
              
              hitComponent={Hit}
              classNames={{
                item: 'itemCustom'
              }}
            />
          </div>
        </div>
      </InstantSearch>
      <Joyride
      steps={steps}
      run={run}
      continuous={true}
      scrollToFirstStep={true}
      showProgress={true}
      showSkipButton={true}
      locale={{back: 'Retour', close: 'Fermer', last: 'Fin', next: 'Suivant', open: 'Ouvrire le guide', skip: 'Passer' }}
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
