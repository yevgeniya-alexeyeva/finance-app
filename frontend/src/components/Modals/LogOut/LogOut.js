import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button } from '@material-ui/core';
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
}));

export default function AddTransaction() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className={styles.exitBtn} onClick={handleOpen}>
        <svg className={styles.exitIcon} width="18" height="18">
          <use href={`${Exit}#icon-exit`}></use>
        </svg>
        Выйти
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="logout-title"
        aria-describedby="logout-description"
      >
        <div style={modalStyle} className={classes.paper}>
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
                style={{ width: 100, borderRadius: 20, padding: '13px 68px' }}
              >
                Отмена
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{
                  marginLeft: 40,
                  width: 100,
                  borderRadius: 20,
                  padding: '13px 68px',
                }}
              >
                Да
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
