import Loader from 'react-loader-spinner';
import { wrapper } from './SmallLoader.module.css';

const loaderProps = {
  type: 'ThreeDots',
  color: '#3f51b5',
  height: 100,
  width: 100,
  timeout: 2000,
  transform: 'translate(-50%, -50%)',
};

const SmallLoader = () => {
  return (
    <div className={wrapper}>
      <Loader {...loaderProps} />
    </div>
  );
};

export default SmallLoader;
