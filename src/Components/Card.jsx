import "../styles/Card.css";
import classNames from "classnames";

export default function Card({
  Id,
  Name,
  Type,
  Ability,
  BaseXP,
  Move1,
  Move2,
  Move3,
  cardClicked,
}) {
  return (
    <>
      <div
        className={classNames("pokemon-card", {
          "water-type": Type === "water",
          "fire-type": Type === "fire",
          "grass-type": Type === "grass",
          "bug-type": Type === "bug",
        })}
        onClick={() => cardClicked(Id)}
      >
        <div className="flex-container">
          <h3>{Name}</h3>
          <h4>{Type} type</h4>
        </div>
        <div className="flex-container">
          <h6>Starting Xp: {BaseXP}</h6>
          <h6>Ability: {Ability}</h6>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="moves">
          <h4>Moves </h4>
          <div className="moves-grid">
            <h5>{Move1}</h5>
            <h5>{Move2}</h5>
            <h5>{Move3}</h5>
          </div>
        </div>
      </div>
    </>
  );
}
