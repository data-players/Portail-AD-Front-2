import React from 'react';
import { marked } from 'marked';
import './AgentPage.css';

const AgentPage = () => {
    // Disclaimer text about the project
    const disclaimerText = `
Le Portail de l'Alimentation Durable est un projet numérique collectif, dont le portage, assuré dans sa première phase par Crisalim et Maurésiaterre, a été confié, en 2025, à Solagro. Le projet a déjà permis de rassembler près d'une dizaine d'acteurs qui contribuent à la construction du projet et centraliser les ressources de 6 structures (cliquer sur le logo en haut à gauche pour accéder au portail).

Dans le but de renforcer sa capacité à faciliter l'accès à une information fiable et pertinente en matière d'alimentation durable mais aussi le traitement et la restitution de l'information, le projet s'oriente vers le développement d'un agent IA en mesure de répondre à cet objectif. Un démonstrateur a été développé dans ce sens est vous est d'ores et déjà proposé à l'utilisation. La phase de déploiement du projet qui débute vise à permettre l'amélioration de cet outil.

Pour partager vos retours sur ce démonstrateur, vos attentes et/ou idées sur ce type d'outil, n'hésitez pas à écrire à : contact@portail-alimentation-durable.fr
`;

    return (
        <div className="agent-page">
            <div className="agent-page-content">
                {/* Hero Section */}
                <div className="agent-hero-section">
                    <h1>Agent IA</h1>
                    <h2>Portail Alimentation Durable</h2>
                    <p className="agent-subtitle">
                        Votre assistant intelligent pour explorer et exploiter les ressources du portail
                    </p>
                </div>

                {/* Disclaimer Section */}
                <div className="agent-disclaimer-section">
                    <div className="agent-disclaimer-content">
                        <div className="agent-disclaimer-icon">ℹ️</div>
                        <div
                            className="agent-disclaimer-text markdown"
                            dangerouslySetInnerHTML={{ __html: marked(disclaimerText) }}
                        />
                    </div>
                </div>

                {/* CTA Button Section */}
                <div className="agent-cta-section">
                    <a
                        href="https://data-players.github.io/Portail-AD-Front-Agent"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="agent-cta-button"
                    >
                        <span className="agent-cta-icon">🤖</span>
                        <span className="agent-cta-text">Accéder à l'Agent IA</span>
                    </a>
                    <p className="agent-cta-description">
                        Interrogez en langage naturel la base de connaissance du portail
                    </p>
                </div>

                {/* Features Section */}
                <div className="agent-features-grid">
                    <div className="agent-feature-card">
                        <h4>Recherche intelligente</h4>
                        <p>Interrogez en langage naturel la base de connaissance</p>
                    </div>
                    <div className="agent-feature-card">
                        <h4>Accès unifié</h4>
                        <p>Explorez les ressources des partenaires du portail</p>
                    </div>
                    <div className="agent-feature-card">
                        <h4>Enrichissement</h4>
                        <p>Bénéficiez d'enrichissements de contenu via Wikipedia</p>
                    </div>
                    <div className="agent-feature-card">
                        <h4>Impact environnemental</h4>
                        <p>Visualisez l'empreinte carbone et eau de chaque requête</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentPage;

