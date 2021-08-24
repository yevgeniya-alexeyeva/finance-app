import Media from 'react-media';

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
          <h2>Home Page</h2>
          {matches.small ? <p>Общая сумма</p> : undefined}
        </>
      )}
    </Media>
  );
}

export default HomePage;
