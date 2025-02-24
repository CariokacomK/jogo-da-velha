import { use, useEffect, useState } from 'react';
import './tabuleiro.css'

function Tabuleiro(){
    const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null))
    const [jogador, setJogador] = useState(true);

    const vitoriasPossiveis = [
        [0,1,2] , [3,4,5] , [6,7,8], //horizontais
        [0,3,6] , [1,4,7] , [2,5,8], //verticais
        [0,4,8] , [2,4,6] //diagonais
    ]

    const reiniciar = () => {
        setTabuleiro(Array(9).fill(null));
    }

    const fazerJogada = (casa) => {
        if(tabuleiro[casa] !== null) return alert("Escolha outra casa"); 
        
        const tabuleiroTemporario = [...tabuleiro]
        
        tabuleiroTemporario[casa] = jogador ? 'X' : 'O';
        setTabuleiro(tabuleiroTemporario);
        setJogador(!jogador);
    }

    const validarVitoria = (tabuleiro, jogador) => {
        const jogadas = tabuleiro.reduce((acc, valorCampo, posicao) => {
            if(valorCampo === (jogador ? 'X' : 'O')) acc.push(posicao);
            return acc
        }, [])

        const isVencedor = vitoriasPossiveis.some(combinacoes => 
            combinacoes.every(combinacao => jogadas.includes(combinacao))
        );

        const isVelha = tabuleiro.every(campo => campo !== null)

        if(isVencedor){
            alert(`O jogador ${jogador ? 'X' : 'O'} venceu!`);
            reiniciar();
        }

        if(!isVencedor && isVelha){
            alert("Deu velha #");
            reiniciar();
        }
    }

    useEffect(() => {
        setTimeout(() => validarVitoria(tabuleiro, !jogador), 20)
    }, [fazerJogada])

    return(
        <>
            <main>
                <div className='linha'>
                    <p onClick={() => fazerJogada(0)}>{tabuleiro[0]}</p>
                    <p onClick={() => fazerJogada(1)}>{tabuleiro[1]}</p>
                    <p onClick={() => fazerJogada(2)}>{tabuleiro[2]}</p>
                </div>
                <div className='linha'>
                    <p onClick={() => fazerJogada(3)}>{tabuleiro[3]}</p>
                    <p onClick={() => fazerJogada(4)}>{tabuleiro[4]}</p>
                    <p onClick={() => fazerJogada(5)}>{tabuleiro[5]}</p>
                </div>
                <div className='linha'>
                    <p onClick={() => fazerJogada(6)}>{tabuleiro[6]}</p>
                    <p onClick={() => fazerJogada(7)}>{tabuleiro[7]}</p>
                    <p onClick={() => fazerJogada(8)}>{tabuleiro[8]}</p>
                </div>
            </main>
        </>
    )
}   

export default Tabuleiro;