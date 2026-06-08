import styles from './SplashScreen.module.scss';
import logo from '../assets/generic-logo.png'
import SplashScreenSegue from '../Segue/SplashScreenSegue';

const SplashScreen = () => {

    return (
        <SplashScreenSegue key={'splash'}>
            <div className={styles.splashScreen}>
                <img src={logo} alt="Generic Logo" />
            </div>
        </SplashScreenSegue>
    );
};

export default SplashScreen;