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

export default function App() {
    let [statusKeyboard, setStatusKeyboard] = useState(true)
    const [listKeys, setListKeys] = useState([])
    const [listLetters, setListLetters] = useState([])

    let [btnEscolher, setBtnEscolher] = useState("Escolher palavra")
    let [traçoLetra, setTraçoLetra] = useState("_")
    let [palavraSecretaClass, setClass] = useState("hide")
    let [statusImg, setStatusImg] = useState(img0)
    let [indice, setIndice] = useState(0)
    let [erros, setErros] = useState()

    function startGame() {
        if(erros === undefined && indice === 0 && statusKeyboard === true){
            setClass(palavraSecretaClass = "palavra-secreta")
            setStatusKeyboard(statusKeyboard = false)
            setIndice(indice = Math.floor(Math.random() * palavras.length))
            setErros(erros = 0)
            setBtnEscolher(btnEscolher = "Mudar palavra")
            PalavraSorteada()
        } else if (erros !== undefined){
             setStatusImg(statusImg = img0)
             setIndice(indice = Math.floor(Math.random() * palavras.length))
             setStatusKeyboard(statusKeyboard = false)
             setListKeys([])
             setErros(erros = 0)
            PalavraSorteada()
        }   //Parte de resetar o game//
    }    

    function PalavraSorteada() {
        let palavraRandom = palavras[indice]
        let arrayCaracteres = palavraRandom.split('');
        
        return (<ul data-identifier="word" className={palavraSecretaClass} >{arrayCaracteres.map((letra, index) => <li key={index}>{traçoLetra}</li>)}</ul>)
    }
    
    function click(letra, index) {
        let palavraRandom = palavras[indice]

        //Click com teclado desabilitado
        if(erros === undefined) {alert("Escolha uma palavra primeiro")} 

        //Click de apagar a tecla
        if (erros !== undefined && !listKeys.includes(index)) {
            setListKeys([...listKeys, index])
            console.log(palavraRandom)

            //Click de acerto e Erro
            if (erros !== undefined && palavraRandom.includes(letra) && listKeys.includes(index)){
                console.log(palavraRandom)
                setListLetters([])
            } else if(erros !== undefined && !palavraRandom.includes(letra)) {
                setErros(erros += 1)
                console.log(erros)
                switch (erros) {
                    case 1: setStatusImg(statusImg = img1); break;
                    case 2: setStatusImg(statusImg = img2); break;
                    case 3: setStatusImg(statusImg = img3); break;
                    case 4: setStatusImg(statusImg = img4); break;
                    case 5: setStatusImg(statusImg = img5); break;
                    case 6: setStatusImg(statusImg = img6); console.log("Você perdeu"); break;
                    default: break;
                }
            }
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
                    <PalavraSorteada />
                </div>
            </div>

            <div className="teclado">{alfabeto.map((letra, index) => <button data-identifier="letter" onClick={() => {click(letra, index)}} className={listKeys.includes(index) || statusKeyboard ? "teclaOff" : "teclaOn"} key={index}>{letra.toUpperCase()}</button>)}</div>

            <div className="chute">
                <span>Já sei a palavra!</span>
                <input disabled = {statusKeyboard} data-identifier="type-guess" type="text" placeholder="Dê o seu palpite"></input>
                <button disabled = {statusKeyboard} data-identifier="guess-button" >Chutar</button>
            </div>
        </div>
    )
}