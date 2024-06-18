import React from 'react';
import { Highlight } from 'react-instantsearch';
import './Hit.css';
import { ReactComponent as DepartementIcon } from '../assets/logos/common/SVG/departement.svg';
import { ReactComponent as ThematiqueIcon } from '../assets/logos/common/SVG/thématique.svg';
import { ReactComponent as TagIcon } from '../assets/logos/common/SVG/tag.svg';
import { ReactComponent as RessourceIcon } from '../assets/logos/common/SVG/ressource.svg';

const Hit = ({ hit }) => {
  return (
    <>
      <article key={hit.id} className="hit-item">
        <div>
          <a href={hit.homePage} target="_blank" rel="noreferrer" className="hit-link">
            <div>
              <h1 className="hit-name">
                <Highlight attribute="title" hit={hit} />
              </h1>
            </div>
          </a>
        </div>
        <div>
          <Highlight attribute="description" hit={hit} />
        </div>
        <div className="hit-details">
          {hit.hasTopic && (
            <div className="hit-topic">
              <div>
                <ThematiqueIcon />
              </div>
              <div>
                <Highlight attribute="hasTopic" hit={hit} separator=" - " />
              </div>
            </div>
          )}
          {hit.hasDepartment && (
            <div className="hit-department">
              <div>
                <DepartementIcon />
              </div>
              <div>
                <Highlight attribute="hasDepartment" hit={hit} separator=" - " />
              </div>
            </div>
          )}
          {hit.hasDataSource && (
            <div className="hit-data-source">
              <div>
                <RessourceIcon />
              </div>
              <div>
                <Highlight attribute="hasDataSource" hit={hit} separator=" - " />
              </div>
            </div>
          )}
        </div>

        {hit.hasKeyword && hit._highlightResult && hit._highlightResult.hasKeyword && hit._highlightResult.hasKeyword.length > 0 && (
          <div className="hit-details">
            <div className="hit-keyword">
              <div className="hit-keyword-icon">
                <TagIcon />
              </div>
              <div className="keyword-container">
                {hit._highlightResult.hasKeyword.map((keyword, index) => (
                  <div key={index} className="keyword-item">
                    <span dangerouslySetInnerHTML={{ __html: keyword.value }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
      <hr className="hit-separator" />
    </>
  );
};

export default Hit;
