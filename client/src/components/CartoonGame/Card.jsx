import './Card.css';

const Card = ({ card, handleChoice, flipped, disabled }) => {
    const handleClick = () => {
        if (!disabled && !flipped) {
            handleChoice(card);
        }
    };

    return (
        <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
            <img className="front" src={card.src} alt="character" />
            <div className="back"></div>
        </div>
    );
};

export default Card;
