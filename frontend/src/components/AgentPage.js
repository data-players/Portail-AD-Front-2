import React from 'react';
import { marked } from 'marked';
import './AgentPage.css';

const AgentPage = () => {
    // Disclaimer text about the project
    const disclaimerText = `
Le Portail de l'Alimentation Durable est un projet numérique collectif, dont le portage, assuré dans sa première phase par Crisalim et Maurésiaterre, a été confié, en 2025, à Solagro. Le projet a déjà permis de rassembler près d'une dizaine d'acteurs qui contribuent à la construction du projet et centraliser les ressources de 6 structures.

Dans le but de renforcer sa capacité à faciliter l'accès à une information fiable et pertinente en matière d'alimentation durable mais aussi le traitement et la restitution de l'information, le projet s'oriente vers le développement d'un agent IA en mesure de répondre à cet objectif. Un démonstrateur a été développé dans ce sens est vous est d'ores et déjà proposé à l'utilisation. La phase de déploiement du projet qui débute vise à permettre l'amélioration de cet outil.

Pour partager vos retours sur ce démonstrateur, vos attentes et/ou idées sur ce type d'outil, n'hésitez pas à écrire à : contact@portail-alimentation-durable.fr
`;

    return (
        <div className="agent-page">
            <div className="agent-page-content">
                <h1>Agent IA</h1>
                <h2>Portail Alimentation Durable</h2>

                <p className="agent-description">
                    Votre assistant intelligent pour explorer et exploiter les ressources du portail
                </p>

                <div className="agent-cta-container">
                    <a
                        href="https://data-players.github.io/Portail-AD-Front-Agent"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="agent-cta-button"
                    >
                        Accéder à l'Agent IA
                    </a>
                </div>

                <div className="agent-disclaimer">
                    <div
                        className="agent-disclaimer-text"
                        dangerouslySetInnerHTML={{ __html: marked(disclaimerText) }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AgentPage;
