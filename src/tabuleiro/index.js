import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './tabuleiro.css';

function Tabuleiro() {
    const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null))
    const [jogador, setJogador] = useState(true);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [velha, setIsVelha] = useState(false);

    const vitoriasPossiveis = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontais
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //verticais
        [0, 4, 8], [2, 4, 6] //diagonais
    ]

    const reiniciar = () => {
        closeModal();
        setTabuleiro(Array(9).fill(null));
    }

    const fazerJogada = (casa) => {
        if (tabuleiro[casa] !== null) return alert("Escolha outra casa");

        const tabuleiroTemporario = [...tabuleiro]

        tabuleiroTemporario[casa] = jogador ? 'X' : 'O';
        setTabuleiro(tabuleiroTemporario);
        setJogador(!jogador);
        definirCor(casa, tabuleiroTemporario);
    }

    const definirCor = (casa, tabuleiro) => {
        const definirCor = tabuleiro[casa].includes('X');

        const casaAfetada = document.getElementById(`${casa}`)

        casaAfetada.classList.add(definirCor ? "xPlayer" : "oPlayer")
    }

    const validarVitoria = (tabuleiro, jogador) => {
        const jogadas = tabuleiro.reduce((acc, valorCampo, posicao) => {
            if (valorCampo === (jogador ? 'X' : 'O')) acc.push(posicao);
            return acc
        }, [])

        const isVencedor = vitoriasPossiveis.some(combinacoes =>
            combinacoes.every(combinacao => jogadas.includes(combinacao))
        );

        const isVelha = tabuleiro.every(campo => campo !== null)

        if (isVencedor) {
            setIsOpen(true, isVencedor);
        }

        if (!isVencedor && isVelha) {
            setIsVelha(true);
            setIsOpen(true);
        }
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        setTimeout(() => validarVitoria(tabuleiro, !jogador), 20)
    }, [fazerJogada])

    return (
        <>
            <main>
                <h1>Jogo da Velha</h1>
                <h6>clique em um quadrado para começar</h6>
                <div className='linha'>
                    <p onClick={() => fazerJogada(0)} id='0'>{tabuleiro[0]}</p>
                    <p onClick={() => fazerJogada(1)} id='1'>{tabuleiro[1]}</p>
                    <p onClick={() => fazerJogada(2)} id='2'>{tabuleiro[2]}</p>
                </div>
                <div className='linha'>
                    <p onClick={() => fazerJogada(3)} id='3'>{tabuleiro[3]}</p>
                    <p onClick={() => fazerJogada(4)} id='4'>{tabuleiro[4]}</p>
                    <p onClick={() => fazerJogada(5)} id='5'>{tabuleiro[5]}</p>
                </div>
                <div className='linha'>
                    <p onClick={() => fazerJogada(6)} id='6'>{tabuleiro[6]}</p>
                    <p onClick={() => fazerJogada(7)} id='7'>{tabuleiro[7]}</p>
                    <p onClick={() => fazerJogada(8)} id='8'>{tabuleiro[8]}</p>
                </div>
            </main>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className="modal"
            >
                {velha ? 
                    <>   
                        <h2>Fim do Jogo, o jogador {jogador ? "'O'" : "'X'"} ganhou</h2>
                        <button onClick={reiniciar}>reiniciar</button>
                    </>
                : <>
                        <h2>Fim do Jogo, deu velha</h2>
                        <button onClick={reiniciar}>reiniciar</button>
                </>}
            </Modal>
        </>
    )
}

export default Tabuleiro;