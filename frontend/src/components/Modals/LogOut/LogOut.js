import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Media from 'react-media';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button } from '@material-ui/core';
import { authOperations } from '../../../redux/auth';
import Exit from './logout.svg';
import CloseIcon from '@material-ui/icons/Close';
import styles from './LogOut.module.css';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 540,
    borderRadius: 20,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '40px 66px',
  },
  paperSmall: {
    width: 240,
    padding: '25px',
  },
}));

export default function AddTransaction() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Media queries={{ small: { maxWidth: 767 } }}>
      {matches => (
        <div>
          <button className={styles.exitBtn} onClick={handleOpen}>
            <svg className={styles.exitIcon} width="18" height="18">
              <use href={`${Exit}#icon-exit`}></use>
            </svg>
            {matches.small ? '' : 'Выйти'}
          </button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="logout-title"
            aria-describedby="logout-description"
          >
            <div
              style={modalStyle}
              className={
                matches.small
                  ? `${classes.paper} ${classes.paperSmall}`
                  : classes.paper
              }
            >
              <div className={styles.modalWindow}>
                <button
                  className={styles.closeBtn}
                  type="button"
                  onClick={handleClose}
                >
                  <CloseIcon />
                </button>

                <h2 id="logout-title" className={styles.title}>
                  Вы уверены, что хотите выйти?
                </h2>

                <div className={styles.btns}>
                  <Button
                    onClick={handleClose}
                    type="button"
                    variant="outlined"
                    color="secondary"
                    style={
                      matches.small
                        ? { width: 60, borderRadius: 20, padding: '6px 44px' }
                        : { width: 100, borderRadius: 20, padding: '13px 68px' }
                    }
                  >
                    Отмена
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => dispatch(authOperations.logOut())}
                    style={
                      matches.small
                        ? {
                            width: 60,
                            borderRadius: 20,
                            padding: '6px 44px',
                            marginLeft: 20,
                          }
                        : {
                            width: 100,
                            borderRadius: 20,
                            padding: '13px 68px',
                            marginLeft: 40,
                          }
                    }
                  >
                    Да
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </Media>
  );
}
