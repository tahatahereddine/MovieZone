import "./Card.css";
function Card(props){
    return(
        <>
            <div className="movie-card">
                <div className="card-picture">
                    <img className="movie-picture" src={props.image} alt={props.title} />
                </div>
                <div className="card-info">
                    <p className="movie-title">{props.title}</p>
                    <p className="movie-release_date">{props.release_date} | {props.rating} <span>★</span>
                    </p>
                </div>
            </div>
        </>
    );
}
export default Card;