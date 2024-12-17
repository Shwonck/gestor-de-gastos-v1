import React from 'react';
import './Intro.css';

const Intro = () => {
    return (
        <div className="intro-container">
            <h1 className="intro-title">Bem-vindo ao Orçamento Pessoal!</h1>
            <p className="intro-description">
                O Orçamento Pessoal é um aplicativo desenvolvido para te ajudar a controlar suas finanças pessoais.
                Organize suas despesas, acompanhe faturas e registre seus recebimentos de forma simples e eficiente.
            </p>
            <p className="intro-call-to-action">Clique nas opções no menu para começar a usar!</p>
        </div>
    );
};

export default Intro;