import Media from 'react-media';
import HomeTab from '../components/HomeTab';
import HomeTabMobile from '../components/HomeTabMobile';
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
          {matches.small ? <p>Общая сумма</p> : undefined}
          <div className={style.wrapper}>
            {matches.small ? <HomeTabMobile /> : <HomeTab />}
          </div>
        </>
      )}
    </Media>
  );
}

export default HomePage;
