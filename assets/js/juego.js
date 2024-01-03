/**
*2C : two of clubs (2 de treboles)
*2H : teo of heart (2 de corazones)
*2D: two of diama  (2 de diamantes)
*2S: two of spa    (2 de espadas)
*/

let deck =       [];
let tipos =      ['C', 'H', 'D', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];

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

    console.log(deck);

    return deck;

}

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

crearDeck();

pedirCarta();

const valor = valorCarta(pedirCarta());
console.log({ valor });

