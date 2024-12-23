import "./Card.css";
import fallback from "../../images/fallback.png";
function Card(props){
    const img = props.image === "fallback" ? fallback : props.image;
    return(
        <>
            <div className="movie-card">
                <div className="card-picture">
                    <img className="movie-picture" src={img} alt={props.title} />
                </div>
                <div className="card-info" onClick={() => props.handleClick(props.id)}>
                    <p className="movie-title">{props.title}</p>
                    <p className="movie-release_date">{props.release_date} | {props.rating} <span>★</span>
                    </p>
                </div>
            </div>
        </>
    );
}
export default Card;