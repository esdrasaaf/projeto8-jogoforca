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
    const [listKeys, setListKeys] = useState([])
    const [listLetters, setListLetters] = useState([])    
    let [statusImg, setStatusImg] = useState(img0)
    let [statusKeyboard, setStatusKeyboard] = useState(true)
    let [statusInput, setStatusInput] = useState(true)
    let [btnEscolher, setBtnEscolher] = useState("Escolher palavra")
    let [palavraSecretaClass, setClass] = useState("hide")
    let [indice, setIndice] = useState(0)
    let [erros, setErros] = useState()
    let palavraRandom = palavras[indice]
    let arrayCaracteres = palavraRandom.split('')
    const arrayCaracteresSemAcento = []
    const [inputValue, setInputValue] = useState('')
    let palavraSemAcentos = palavraRandom.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    let arrayTraço = [];
    console.log(palavraRandom)
    
    if(erros !== undefined) {
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
        if(erros === undefined && indice === 0 && statusKeyboard === true){
            setClass(palavraSecretaClass = "palavra-secreta")
            setStatusKeyboard(statusKeyboard = false)
            setStatusInput(statusInput = false)
            setIndice(indice = Math.floor(Math.random() * palavras.length))
            setErros(erros = 0)
            setBtnEscolher(btnEscolher = "Mudar palavra")
        } else if (erros !== undefined){
            setStatusImg(statusImg = img0)
            setIndice(indice = Math.floor(Math.random() * palavras.length))
            setStatusKeyboard(statusKeyboard = false)
            setStatusInput(statusInput = false)
            setListKeys([])
            setListLetters([])
            setErros(erros = 0)
            if (btnEscolher === "Tentar Novamente") {
                setBtnEscolher(btnEscolher = "Mudar palavra")
                setClass(palavraSecretaClass = "palavra-secreta")
            } else if (btnEscolher === "Nova Palavra") {
                setBtnEscolher(btnEscolher = "Mudar palavra")
                setClass(palavraSecretaClass = "palavra-secreta")
            }
        }
    }    
    
    function click(letra, index) {

        //Click de apagar a tecla
        if (erros !== undefined && !listKeys.includes(index)) {
            setListKeys([...listKeys, index])

            //Click de acerto e Erro ; Quando perde
            for(let i = 0; i < arrayCaracteres.length; i++){        
                arrayCaracteresSemAcento.push(arrayCaracteres[i].normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
            }

            if(erros !== undefined && arrayCaracteresSemAcento.includes(letra)){
                variavel = [...listLetters, letra]
                console.log(arrayCaracteresSemAcento)
                setListLetters(variavel)
            } else if(erros !== undefined && !arrayCaracteresSemAcento.includes(letra)) {
                setErros(erros += 1)
                switch (erros) {
                    case 1: setStatusImg(statusImg = img1); break;
                    case 2: setStatusImg(statusImg = img2); break;
                    case 3: setStatusImg(statusImg = img3); break;
                    case 4: setStatusImg(statusImg = img4); break;
                    case 5: setStatusImg(statusImg = img5); break;
                    case 6: setStatusImg(statusImg = img6); 
                    setBtnEscolher(btnEscolher = "Tentar Novamente"); 
                    setClass(palavraSecretaClass = "perdeu");
                    arrayCaracteres.forEach(letra => {listLetters.push(letra.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))}); 
                    setStatusInput(statusInput = true); 
                    setStatusKeyboard(statusKeyboard = true); break;
                    default: break;
                }
            }
            
            const palavraAtual = palavraRandom.split("").map(e => variavel.includes(e.normalize('NFD').replace(/[\u0300-\u036f]/g, "")) ? e : "_").join("");
            console.log(palavraAtual)
            if (palavraAtual === palavraRandom && erros <= 5){
                setClass(palavraSecretaClass = "ganhou");
                setBtnEscolher(btnEscolher = "Nova Palavra"); 
                setStatusKeyboard(statusKeyboard = true)
                setStatusInput(statusInput = true)
                arrayCaracteres.forEach(letra => {listLetters.push(letra.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))})
                setListKeys([])
            }            
        }
    }

    function verificaChute() {
        const palavraChutada = inputValue
        setInputValue('')
        if(palavraChutada === '') {
            alert("Escreva algo antes de chutar")
        } else if(palavraChutada.toLowerCase()  === palavraRandom || palavraChutada.toLowerCase() === palavraSemAcentos) {
            setClass(palavraSecretaClass = "ganhou");
            setBtnEscolher(btnEscolher = "Nova Palavra"); 
            setStatusKeyboard(statusKeyboard = true)
            setStatusInput(statusInput = true)
            arrayCaracteres.forEach(letra => {listLetters.push(letra.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))})
            setListKeys([])
        } else {
            setStatusImg(statusImg = img6);
            setBtnEscolher(btnEscolher = "Tentar Novamente"); 
            setClass(palavraSecretaClass = "perdeu"); 
            arrayCaracteres.forEach(letra => {listLetters.push(letra.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))});
            setListKeys([])
            setStatusKeyboard(statusKeyboard = true)
            setStatusInput(statusInput = true)
        } 
    }

    return (
        <> 
            <GlobalStyle></GlobalStyle>       
            <Content>
                <GameTitle>
                    <span>Jogo da Forca</span>
                    <img src={imgTop} alt="Emogi forca"/>
                </GameTitle>
                
                <TopContent>
                    <img data-identifier="game-image" className="forcaImg" src={statusImg} alt="Imagem de uma forca"/>
                    <RightPart>
                        <button data-identifier="choose-word" onClick={startGame}>
                            {btnEscolher}
                        </button>
                        <ul 
                            data-identifier="word" 
                            className = {palavraSecretaClass} >
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
        </>

    )
}

//Styleds Components//
const Content = styled.div`
    background-color: rgb(224, 222, 222);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 810px;
    width: 1000px;
    margin: 0 auto;
    padding: 20px;
    border: solid 10px rgb(37, 36, 36);
    border-radius: 10px;
`
const GameTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 400px;
    margin-bottom: 20px;

    img {
        height: 80px;
    }

    span {
        font-weight: bold;
        font-size: 40px;
        font-family: 'RocknRoll One';
        color: rgb(63, 62, 62);
    }
`
const TopContent = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin-bottom: 40px;
    margin-top: 10px;

    img {
        width: 300px;
    }
`
const RightPart = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    justify-content: flex-end;
    width: 100%;

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
        color: red
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
    }

    input {
        width: 60%;
        height: 90%;
        font-size: 18px;
        border-radius: 10px;
        text-align: center;
        font-family: 'RocknRoll One', sans-serif;
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
    }
`