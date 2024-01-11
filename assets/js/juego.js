/**
*2C : two of clubs (2 de treboles)
*2H : two of heart (2 de corazones)
*2D: two of diama  (2 de diamantes)
*2S: two of spa    (2 de espadas)
*/

let deck =       [];
let tipos =      ['C', 'H', 'D', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;


//Referencias HTML
const btnPedir =         document.querySelector('#btnPedir');
const btnDetener =       document.querySelector('#btnDetener');
const bntNuevoJuego =    document.querySelector('#btnNuevo');

const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');


const crearDeck = () =>{

    for(let i = 2; i <= 10; i++){
        for( let tipo of tipos ){
            deck.push(`${i}${tipo}`); 
        }
    }

    for( let tipo of tipos){
        for( let esp of especiales){

            deck.push(`${esp}${tipo}`); 

        }
    }

    deck = _.shuffle( deck );

    return deck;

}

crearDeck();

//Funcion para solicitar una carta
const pedirCarta = () =>{

    if( deck.length === 0){
        throw ('No hay cartas en el deck');
    }

    let carta = deck.pop();
    
    return carta;
}

const valorCarta = ( carta ) =>{

    const valor = carta.substring(0, carta.length - 1);
    /*let puntos = 0;
     
    if (isNaN( valor ) ){
        puntos = ( valor === 'A') ? 11 : 10;
    }else{
        
        puntos = valor * 1;
    }

    console.log( puntos );
    */

    return (isNaN( valor )) ?
            ( valor === 'A') ? 11: 10
            : valor * 1
}

//Turno de la computadora
const turnoComputadora = ( puntosMinimos ) =>{
     do{

        const carta = pedirCarta();
        
        puntosComputadora = puntosComputadora + valorCarta( carta );

        puntosHTML[1].innerText = puntosComputadora;

        //<img class="carta" src="./assets/cartas/cartas/10D.png"></img>
        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/cartas/${ carta }.png`;
        imgCarta.classList.add( 'carta' );

        divCartasComputadora.append( imgCarta );

        if( puntosMinimos > 21 ){
            break;
        }

    } while( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21) ); 

    setTimeout(() =>{

        if( puntosComputadora === puntosMinimos) {
            alert('Nadie gana');
        }else if( puntosMinimos > 21 ){
            alert(' Computadora gana');
        }else if ( puntosComputadora > 21 ){
            alert( 'Jugador gana' );
        }else{
            alert('Computadora gana');
        }

    }, 10);

    

}

//Eventos
btnPedir.addEventListener('click', () =>{

    const carta = pedirCarta();
    
    puntosJugador = puntosJugador + valorCarta( carta );

    puntosHTML[0].innerText = puntosJugador;

    //<img class="carta" src="./assets/cartas/cartas/10D.png"></img>
    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/cartas/cartas/${ carta }.png`;
    imgCarta.classList.add( 'carta' );

    divCartasJugador.append( imgCarta );

    if(puntosJugador > 21){
        console.warn('Lo iento, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );

        

        


    }else if (puntosJugador === 21){
        console.warn(' Ganaste');
        btnPedir.disabled = true;
        turnoComputadora( puntosJugador );

        
    }

});

btnDetener.addEventListener( 'click', () =>{

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );


});

bntNuevoJuego.addEventListener('click', () =>{

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosComputadora = 0;
    puntosJugador = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasJugador.innerHTML = ''; //Elimina las cartas que se tengan
    divCartasComputadora.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
    
    




});







