import React from 'react';
import { Highlight } from 'react-instantsearch';

const Hit = ({ hit }) => {
  return (
    <article key={hit.id}>
      <a href={hit.homePage} target="_blank" rel="noreferrer">
        <h1 className="hit-name">
          <Highlight attribute="title" hit={hit} />
        </h1>
      </a>
      <p className="hit-categories"><Highlight attribute="hasKeyword" hit={hit} separator=" - " /></p>
      <p className="hit-categories"><Highlight attribute="hasDataSource" hit={hit} separator=" - " /></p>
      <p className="hit-categories"><Highlight attribute="hasTopic" hit={hit} separator=" - " /></p>
      <p className="hit-categories"><Highlight attribute="hasDepartment" hit={hit} separator=" - " /></p>
      <Highlight attribute="description" hit={hit} />
    </article>
  );
};

export default Hit;
