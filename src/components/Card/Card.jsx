
function Card({img, title, description}){
    const styles = {
        card: {
            width: '18rem',
            margin: '1rem',
        },
        img: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
        },
        cardBody: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    }
    return(
        <div className="card" style={styles.card}>
            <img src={img} style={styles.card} alt="casa de papel picture"/>
            <div className="card-body" style={styles.cardBody}>
                <h5>salah :{title}</h5>
                <p>{description}</p>
                <a href="#">Go somewhere</a>
            </div>
        </div>
    );
}
export default Card;