import backgroundImage from '../Assets/painting-mountain-lake-with-mountain-background_188544-9126.avif'; // Шлях до вашого фонового зображення
import '../Styles/home.css'

const Home = () => {
    return (
        <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1>Welcome to Home</h1>
        </div>
    );
}
export default Home;