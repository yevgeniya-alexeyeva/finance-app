import { Notification as PNotify } from 'react-pnotify';

// accepts types 'success', 'error', 'info'
const Notification = ({ type, title, message }) => {
  return (
    <PNotify
      type={type}
      title={title}
      text={message}
      delay={5000}
      shadow={true}
      nonblock={true}
    ></PNotify>
  );
};

export default Notification;
