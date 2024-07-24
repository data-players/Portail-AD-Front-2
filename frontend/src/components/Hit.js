import React from 'react';
import { Highlight } from 'react-instantsearch';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify'; // Importer DOMPurify
import he from 'he'; // Importer he
import './Hit.css';
import { ReactComponent as DepartementIcon } from '../assets/logos/common/SVG/departement.svg';
import { ReactComponent as ThematiqueIcon } from '../assets/logos/common/SVG/thématique.svg';
import { ReactComponent as TagIcon } from '../assets/logos/common/SVG/tag.svg';
import { ReactComponent as RessourceIcon } from '../assets/logos/common/SVG/ressource.svg';

const Hit = ({ hit }) => {
  // console.log(hit);
  if (hit.hasKeyword && !Array.isArray(hit.hasKeyword)) {
    hit.hasKeyword = [hit.hasKeyword];
    hit._highlightResult.hasKeyword = [hit._highlightResult.hasKeyword];
    hit._snippetResult.hasKeyword = [hit._snippetResult.hasKeyword];
  } else if (hit.hasKeyword && Array.isArray(hit.hasKeyword)) {
    console.log(hit);
    const TagLength = 5;
    hit.hasKeyword = hit.hasKeyword.filter((keyword, index) => {
      return index < TagLength || hit._highlightResult.hasKeyword[index].value.includes('mark');
    });
    hit._highlightResult.hasKeyword = hit._highlightResult.hasKeyword.filter((highlight, index) => {
      return index < TagLength || highlight.value.includes('mark');
    });
    hit._snippetResult.hasKeyword = hit._snippetResult.hasKeyword.filter((snippet, index) => {
      return index < TagLength || snippet.value.includes('mark');
    });
  }



  // Décoder les entités HTML
  const decodedHTML = hit._highlightResult.description?.value?he.decode(hit._highlightResult.description?.value):'';
  // Nettoyer et sécuriser le HTML
  const cleanHTML = DOMPurify.sanitize(decodedHTML);

  return (
    <>
      <article key={hit.id} className="hit-item">
        <div>
          <a href={hit.homePage} target="_blank" rel="noreferrer" className="hit-link">
            <div>
              <span className="body1 hit-name hit-title">
                <Highlight attribute="title" hit={hit} />
              </span>
            </div>
          </a>
        </div>
        <div className='body3 hit-description'>
          {parse(cleanHTML)}
        </div>
        <div className="hit-details">
          {hit.hasDataSource && (
            <div className="hit-data-source body3">
              <div>
                <RessourceIcon />
              </div>
              <div>
                <Highlight attribute="hasDataSource" hit={hit} separator=" - " />
              </div>
            </div>
          )}
          {hit.hasDepartment && (
            <div className="hit-department body3">
              <div>
                <DepartementIcon />
              </div>
              <div>
                <Highlight attribute="hasDepartment" hit={hit} separator=" - " />
              </div>
            </div>
          )}
          {hit.hasTopic && (
            <div className="hit-topic body3">
              <div>
                <ThematiqueIcon />
              </div>
              <div>
                <Highlight attribute="hasTopic" hit={hit} separator=" - " />
              </div>
            </div>
          )}

        </div>

        {hit?._highlightResult?.hasKeyword &&  (
          <div className="hit-details">
            <div className="hit-keyword body3">
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
        <hr className="hit-separator" />
      </article>

    </>
  );
};

export default Hit;
