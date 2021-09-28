import style from './Loader.module.css';
import Animation from './loader.gif';

const Loader = () => {
  return (
    <div className={style.backdrop}>
      <img className={style.loader} src={Animation} alt="loader" />
    </div>
  );
};

export default Loader;
