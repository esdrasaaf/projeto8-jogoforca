import React, { useState } from 'react';
import GlobalStyle from './globalStyles';
import palavras from "./palavras";
import alfabeto from './alfabeto';
import imgTop from "./images/FORCAGRANDE.png"
import img0 from "./images/forca0.png";
import img1 from "./images/forca1.png";
import img2 from "./images/forca2.png";
import img3 from "./images/forca3.png";
import img4 from "./images/forca4.png";
import img5 from "./images/forca5.png";
import img6 from "./images/forca6.png";
import styled from 'styled-components';

let variavel = [];

export default function App() {
    // VARIÁVEIS //
    const [listKeys, setListKeys] = useState([])
    const [listLetters, setListLetters] = useState([])    
    const [statusImg, setStatusImg] = useState(img0)
    const [statusKeyboard, setStatusKeyboard] = useState(true)
    const [statusInput, setStatusInput] = useState(true)
    const [greenBtn, setGreenBtn] = useState("Escolher palavra")
    const [secretWordClass, setClass] = useState("hide")
    const [index, setIndex] = useState(0)
    const arrayCaracteresSemAcento = []
    const [inputValue, setInputValue] = useState('')
    const palavraRandom = palavras[index]
    const arrayCaracteres = palavraRandom.split('')
    let palavraSemAcentos = palavraRandom.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    let arrayTraço = [];
    let [mistakes, setMistakes] = useState()
    console.log(palavraRandom)
    
    //Parte de verificar quando ganhou
    if(mistakes !== undefined) {
        arrayCaracteres.map((letra) => {
            if(variavel.includes(letra.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))) {
                arrayTraço.push(letra)
            } else {
                arrayTraço.push("_")
            }
            return "oi"
        });
    }

    function startGame() {
        //Quando o jogo começa ; Quando o jogo é resetado
        if(mistakes === undefined && index === 0 && statusKeyboard === true){
            setClass("palavra-secreta")
            setStatusKeyboard(false)
            setStatusInput(false)
            setIndex(Math.floor(Math.random() * palavras.length))
            setMistakes(mistakes = 0)
            setGreenBtn("Mudar palavra")
        } else if (mistakes !== undefined){
            setStatusImg(img0)
            setIndex(Math.floor(Math.random() * palavras.length))
            setStatusKeyboard(false)
            setStatusInput(false)
            setListKeys([])
            setListLetters([])
            setMistakes(mistakes = 0)
            if (greenBtn === "Tentar Novamente") {
                setGreenBtn("Mudar palavra")
                setClass("palavra-secreta")
            } else if (greenBtn === "Nova Palavra") {
                setGreenBtn("Mudar palavra")
                setClass("palavra-secreta")
            }
        }
    }    
    
    function click(letra, index) {

        //Click de apagar a tecla
        if (mistakes !== undefined && !listKeys.includes(index)) {
            setListKeys([...listKeys, index])

            //Click de acerto e Erro ; Quando perde
            for(let i = 0; i < arrayCaracteres.length; i++){        
                arrayCaracteresSemAcento.push(arrayCaracteres[i].normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
            }

            if(mistakes !== undefined && arrayCaracteresSemAcento.includes(letra)){
                variavel = [...listLetters, letra]
                setListLetters(variavel)
            } else if(mistakes !== undefined && !arrayCaracteresSemAcento.includes(letra)) {
                setMistakes(mistakes += 1)
                switch (mistakes) {
                    case 1: setStatusImg(img1); break;
                    case 2: setStatusImg(img2); break;
                    case 3: setStatusImg(img3); break;
                    case 4: setStatusImg(img4); break;
                    case 5: setStatusImg(img5); break;
                    case 6: setStatusImg(img6); 
                    setGreenBtn("Tentar Novamente"); 
                    setClass("perdeu");
                    arrayCaracteres.forEach(letra => {listLetters.push(letra.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))}); 
                    setStatusInput(true); 
                    setStatusKeyboard(true); break;
                    default: break;
                }
            }
            
            //Quando ganha 
            const palavraAtual = palavraRandom.split("").map(e => variavel.includes(e.normalize('NFD').replace(/[\u0300-\u036f]/g, "")) ? e : "_").join("");
            if (palavraAtual === palavraRandom && mistakes <= 5){
                setClass("ganhou");
                setGreenBtn("Nova Palavra"); 
                setStatusKeyboard(true)
                setStatusInput(true)
                arrayCaracteres.forEach(letra => {listLetters.push(letra.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))})
                setListKeys([])
            }            
        }
    }

    function verificaChute() {
        const palavraChutada = inputValue
        setInputValue('')

        //Quando chutou vazio ; Quando chutou e ganhou ; Quando chutou e perdeu
        if(palavraChutada === '') {
            alert("Escreva algo antes de chutar")
        } else if(palavraChutada.toLowerCase()  === palavraRandom || palavraChutada.toLowerCase() === palavraSemAcentos) {
            setClass("ganhou");
            setGreenBtn("Nova Palavra"); 
            setStatusKeyboard(true)
            setStatusInput(true)
            arrayCaracteres.forEach(letra => {listLetters.push(letra.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))})
            setListKeys([])
        } else {
            setStatusImg(img6);
            setGreenBtn("Tentar Novamente"); 
            setClass("perdeu"); 
            arrayCaracteres.forEach(letra => {listLetters.push(letra.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))});
            setListKeys([])
            setStatusKeyboard(true)
            setStatusInput(true)
        } 
    }

    return (
        <> 
            <GlobalStyle></GlobalStyle> 
            <Root>
                <Content>
                    <GameTitle>
                        <span>Jogo da Forca</span>
                        <img src={imgTop} alt="Emogi forca"/>
                    </GameTitle>
                    
                    <TopContent>
                        <img data-identifier="game-image" className="forcaImg" src={statusImg} alt="Imagem de uma forca"/>
                        <RightPart>
                            <button data-identifier="choose-word" onClick={startGame}>
                                {greenBtn}
                            </button>
                            <ul 
                                data-identifier="word" 
                                className = {secretWordClass} >
                                    {arrayCaracteres.map((letra, index) => 
                                        <li key={index}>
                                            {listLetters.includes(letra.normalize('NFD').replace(/[\u0300-\u036f]/g, "")) ? `${letra}` : "_"}
                                        </li>
                                    )}
                            </ul>
                        </RightPart>
                    </TopContent>

                    <Keyboard>
                        {alfabeto.map((letra, index) => 
                            <button 
                                disabled = {statusInput} 
                                data-identifier="letter" 
                                onClick={() => {click(letra, index)}} 
                                className={listKeys.includes(index) || statusKeyboard ? "teclaOff" : "teclaOn"} 
                                key={index}>
                                {letra.toUpperCase()}
                            </button>)}
                    </Keyboard>

                    <Attempt>
                        <span>Já sei a palavra!</span>
                        <input 
                            disabled = {statusInput} 
                            value={inputValue} 
                            onChange ={(event) => setInputValue(event.target.value)} 
                            data-identifier="type-guess" 
                            type="form" 
                            placeholder="Dê o seu palpite">
                        </input>
                        <button 
                            disabled = {statusInput} 
                            onClick={verificaChute} 
                            type="input" 
                            data-identifier="guess-button">Chutar
                        </button>
                    </Attempt>
                </Content>
            </Root> 
        </>

    )
}

//Styleds Components//
const Root = styled.div`
    background-color: rgb(155, 164, 172);
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    //Responsividade Celular
    @media (max-width: 500px) {
        height: 100%;
    }

    //Responsividade Intermediária
    @media (max-width: 800px) {
        height: 100%;
    }
`
const Content = styled.div`
    background-color: rgb(224, 222, 222);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90%;
    width: 1000px;
    margin: 0 auto;
    padding: 20px;
    border: solid 10px rgb(37, 36, 36);
    border-radius: 10px;

    //Responsividade Celular
    @media (max-width: 500px) {
        width: 100%;
        height: 100%;
        border: none;
    }

    //Responsividade Intermediária
    @media (max-width: 800px) {
        width: 100%;
        height: 100%;
        border: none;
    }

    //Responsividade Tablet
    @media (max-width: 1000px) {
       height: 95%;
    }
`
const GameTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 400px;
    margin-bottom: 20px;

    //Responsividade Celular
    @media (max-width: 500px) {
            width: 280px;
        }

    img {
        height: 80px;

        //Responsividade Celular
        @media (max-width: 500px) {
            height: 60px;
        }
    }

    span {
        font-weight: bold;
        font-size: 40px;
        font-family: 'RocknRoll One';
        color: rgb(63, 62, 62);

        //Responsividade Celular
        @media (max-width: 500px) {
            font-size: 28px;
        }
    }
`
const TopContent = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin-bottom: 40px;
    margin-top: 10px;

    //Responsividade Celular
    @media (max-width: 500px) {
        flex-direction: column;
        margin-bottom: 20px;
    }

    //Responsividade Intermediária
    @media (max-width: 800px) {
        flex-direction: column;
        margin-bottom: 20px;
    }

    img {
        width: 300px;

        //Responsividade Celular
        @media (max-width: 500px) {
            width: 85%;
            margin: 0 auto;
        }

        //Responsividade Intermediária
        @media (max-width: 800px) {
            width: 45%;
            margin: 0 auto;
        }


        //Responsividade Tablet
        @media (max-width: 1000px) {
            width: 270px;
        }
    }
`
const RightPart = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: flex-end;
    width: 100%;

    //Responsividade Celular
    @media (max-width: 500px) {
        align-items: center;
        margin-top: 20px;
    }

    //Responsividade Intermediária
    @media (max-width: 800px) {
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }

    button {
        background-color: rgb(38, 175, 96);
        color: white;
        font-family: 'Roboto', sans-serif;
        font-size: large;
        font-weight: bold;
        height: 45px;
        width: 170px; 
        border: none;
        border-radius: 5px;
        margin-top: 26px;
        cursor: pointer;
        position: absolute;
        right: 25px;
        top: -5px;

        //Responsividade Celular
        @media (max-width: 500px) {
            position: initial;
            margin-bottom: 30px;
        }

        //Responsividade Intermediária
        @media (max-width: 800px) {
            position: initial;
            margin-bottom: 30px;
        }

        &:hover {
            background-color: #2E8B57;
        }
    }
    
    .hide {
        display: none;
    }

    .palavra-secreta {
        font-family: 'RocknRoll One', sans-serif;
        display: flex;
        letter-spacing: 15px;
        font-weight: 500;
        font-size: 40px;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 30px;
        margin-left: 80px;

        //Responsividade Celular
        @media (max-width: 500px) {
            margin-left: 15px;
            font-size: 35px;
        }

        //Responsividade Intermediária
        @media (max-width: 800px) {
            margin-left: 15px;
            font-size: 35px;
        }
    }

    .ganhou {
        font-family: 'RocknRoll One', sans-serif;
        display: flex;
        letter-spacing: 15px;
        font-weight: 500;
        font-size: 40px;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 30px;
        margin-left: 80px;
        color: green;

        //Responsividade Celular
        @media (max-width: 500px) {
            margin-left: 15px;
            font-size: 35px;
        }

        //Responsividade Intermediária
        @media (max-width: 800px) {
            margin-left: 15px;
            font-size: 35px;
        }
    }

    .perdeu {
        font-family: 'RocknRoll One', sans-serif;
        display: flex;
        letter-spacing: 15px;
        font-weight: 500;
        font-size: 40px;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 30px;
        margin-left: 80px;
        color: red;

        //Responsividade Celular
        @media (max-width: 500px) {
            margin-left: 15px;
            font-size: 35px;
        }

        //Responsividade Intermediária
        @media (max-width: 800px) {
            margin-left: 15px;
            font-size: 35px;
        }
    }
`
const Keyboard = styled.div`
    background-color: rgb(107, 106, 107);
    box-sizing: border-box;
    width: 91%;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 35px;
    padding: 10px;
    border-radius: 8px;
    border: solid 1px rgb(73, 73, 73);

    //Responsividade Tablet
        @media (max-width: 1000px) {
        width: 90%;
    }

    .teclaOff{
        color: rgb(107, 105, 103);
        background-color: rgb(141, 157, 163);
        border: none;
        cursor: default;
        height: 45px;
        width: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        font-weight: bold;
        font-family: 'Roboto', sans-serif;
        font-size: large;
    }

    .teclaOn {
        color: rgb(76, 112, 145);
        background-color: rgb(224, 236, 243);
        cursor: pointer;
        border-color: rgb(173, 203, 225);
        height: 45px;
        width: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        font-weight: bold;
        font-family: 'Roboto', sans-serif;
        font-size: large;   
        
        &:hover {
        background-color: rgb(173, 203, 225);
        }
    }
`
const Attempt = styled.div`
    width: 90%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    span {
        font-size: 18px;
        cursor: default;
        margin-left: 30px;
        font-family: 'Varela Round', sans-serif;

        //Responsividade Celular
        @media (max-width: 500px) {
            margin-left: 0;
            margin-right: 10px;
            text-align: center;
        }

        //Responsividade Intermediária
        @media (max-width: 800px) {
            margin-left: 0;
            margin-right: 10px;
            text-align: center;
        }
    }

    input {
        width: 60%;
        height: 90%;
        font-size: 18px;
        border-radius: 10px;
        text-align: center;
        font-family: 'RocknRoll One', sans-serif;

        //Responsividade Celular
        @media (max-width: 500px) {
           width: 50%;
        }

        //Responsividade Intermediária
        @media (max-width: 800px) {
            width: 50%;
        }

        //Responsividade Tablet
        @media (max-width: 1000px) {
            width: 50%;
        }
    }

    button {
        cursor: pointer;
        width: 100px;
        height: 100%;
        font-family: 'Varela Round', sans-serif;
        font-weight: bold;
        font-size: 15px;
        margin-right: 20px;
        border-radius: 10px;
        border-color: rgb(173, 203, 225);
        color: rgb(76, 112, 145);
        background-color: rgb(224, 236, 243);

        //Responsividade Celular
        @media (max-width: 500px) {
            margin-left: 15px;
            margin-right: 0;
        }

        //Responsividade Intermediária
        @media (max-width: 800px) {
            margin-right: 0px;
        }

        &:hover {
            background-color: #ADD8E6;
        }
    }
`