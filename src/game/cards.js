import generateRandomCard from '../data'
import React from 'react';
import { setTimeout } from 'timers';
import image from '../assets/dealer.png'

class Cards extends React.Component {
    state = { 
        value: '',
        cardArray: [],
        snapCount: 0,
        snap: false,
        cardsDealt: 52,
        className: 'dealer'
       
     }
    render() { 
        const { snapCount, snap, cardsDealt, className } = this.state;
        

        return ( 
            
            <div className="app">
                {cardsDealt > 0 &&
                    <div>
                        <div onClick={this.generateValue}><img className={className} src={image} alt="dealer logo"/></div> 
                        <div className="deck">
                            {this.state.cardArray.map((el, i) => {
                                return <div className="card" key={i}><p className="top">{el}</p><p className="bottom">{el}</p></div>
                            })}
                            
                        </div>
                        
                        {snap && <p className="snap">SNAP!</p>}
                           
                        <p className="count">{snapCount}</p>
                        <button onClick={this.startAgain}>Start Over</button>
                    </div>                
                }
                {
                    cardsDealt === 0 &&
                    <div>
                        <p>Out of cards</p>
                        <button onClick={this.startAgain}>Start Over</button>
                    </div>
                }          
            </div>
         );
    }
    generateValue = () => {
        
        let card = generateRandomCard();
        // if card already exists then try again
        if (this.state.cardArray.includes(card) && card !== 'Joker') {
            card = generateRandomCard();
            
        }
       
      
        this.setState(() => {
            return {
                value: card,
                nextCard: card,
                snap: false,
                className: "dealer rotate"
            }
        }, () => {
            this.pushCardToArray()
            setTimeout(() => {
                this.setState({
                    className: 'dealer'
                })
            }, 1000)
           
         
            
        })
    }
    pushCardToArray = () => {
        this.setState(state => {
            const cardArray = [...state.cardArray, state.value];
            return {
              cardArray,
              value: '',
              cardsDealt: state.cardsDealt -1
            };
          }, () => {
              setTimeout(() => {
                this.countSnaps()

              }, 1000)
          });
    }
    countSnaps = () => {
        const { cardArray, snapCount } = this.state;
           
            cardArray.forEach((card, index) => {
                if (cardArray[index+1] !== undefined) {
                   
                    if (card.length === 3 && cardArray[index+1].length === 3) {
                        this.update(snapCount, cardArray)  
                    }

                    if (card.length === 3 || cardArray[index+1].length === 3) {
                        if (card[card.length - 1] === cardArray[index+1][cardArray[index+1].length -1]) {
                            this.update(snapCount, cardArray)   
                        }             
                    } 
                    
                    if ((card[0] === cardArray[index+1][0]) || (card[1] === cardArray[index+1][1])) {
                    
                        this.update(snapCount, cardArray)
                    } 
                    if (card === 'Joker' || cardArray[index+1] === 'Joker') {
                        this.update(snapCount, cardArray) 
                    }                
                }     
            })
    }
    update = () => {
       
        this.setState((prevState => {
            return {
                snapCount: prevState.snapCount + 1,
                cardArray: [],
                snap: true
            }
        }))
       
    }

    startAgain = () => {
        this.setState({
            value: '',
            cardArray: [],
            snapCount: 0,
            snap: false,
            cardsDealt: 52
        })
    }
}
 
export default Cards;