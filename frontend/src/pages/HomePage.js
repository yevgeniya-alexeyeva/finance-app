import Media from 'react-media';
import HomeTab from '../components/HomeTab';
import HomeTabMobile from '../components/HomeTabMobile';
import Balance from '../components/Balance';
import style from './HomePage.module.css';

function HomePage() {
  return (
    <Media
      queries={{
        small: { maxWidth: 767 },
        medium: { minWidth: 768, maxWidth: 1279 },
        large: { minWidth: 1280 },
      }}
    >
      {matches => (
        <>
          {matches.small ? <Balance /> : undefined}
          <div className={style.wrapper}>
            {matches.small ? <HomeTabMobile /> : <HomeTab />}
          </div>
        </>
      )}
    </Media>
  );
}

export default HomePage;
