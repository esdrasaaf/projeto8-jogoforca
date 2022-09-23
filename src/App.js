import React, { useState } from 'react';
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
        } else if(palavraChutada === palavraRandom || palavraChutada === palavraSemAcentos) {
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
        <div className="content">
            <div className="nome-img">
                <span>Jogo da Forca</span>
                <img src={imgTop} alt="Emogi forca"/>
            </div>
            
            <div className="top-content">
                <img data-identifier="game-image" className="forcaImg" src={statusImg} alt="Imagem de uma forca"/>
                <div className="direita">
                    <button data-identifier="choose-word" className="btnEscolher" onClick={startGame}>{btnEscolher}</button>
                    <ul data-identifier="word" className = {palavraSecretaClass} >{arrayCaracteres.map((letra, index) => <li className={index} key={index}>{listLetters.includes(letra.normalize('NFD').replace(/[\u0300-\u036f]/g, "")) ? `${letra}` : "_"}</li>)}</ul>
                </div>
            </div>

            <div className="teclado">{alfabeto.map((letra, index) => <button disabled = {statusInput} data-identifier="letter" onClick={() => {click(letra, index)}} className={listKeys.includes(index) || statusKeyboard ? "teclaOff" : "teclaOn"} key={index}>{letra.toUpperCase()}</button>)}</div>

            <div className="chute">
                <span>Já sei a palavra!</span>
                <input disabled = {statusInput} value={inputValue} onChange ={(event) => setInputValue(event.target.value)} data-identifier="type-guess" type="form" placeholder="Dê o seu palpite"></input>
                <button disabled = {statusInput} onClick={verificaChute} type="input" data-identifier="guess-button" >Chutar</button>
            </div>
        </div>
    )
}