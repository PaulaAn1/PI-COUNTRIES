import './Homepage.css';
import videoBg from '../assets/videobg1.mp4';

const Homepage = () => {
  return (
    <header className="header content">
      <div className="header-video">
        <video src={videoBg} autoPlay loop muted></video>
      </div>
      <div className="header-overlay"></div>
      <div className="header-content">
        <h1>COUNTRY APP</h1>
        <a href="http://localhost:3000/home">CLICK TO START</a>
      </div>
    </header>
  )
}

export default Homepage;