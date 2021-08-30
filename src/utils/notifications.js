import { error, info, success, defaults, Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Angeler.css';

const stack = new Stack({
  dir1: 'up',
});
defaults.delay = 1800;
defaults.closerHover = false;

function createErrorNotification(message) {
  error({
    text: message,
    stack,
    addClass: 'angeler-extended',
  });
}

function createInfoNotification(message) {
  info({
    text: message,
    stack,
    addClass: 'angeler-extended',
  });
}

function createSuccessNotification(message) {
  success({
    text: message,
    stack,
    addClass: 'angeler-extended',
  });
}

export {
  createErrorNotification,
  createInfoNotification,
  createSuccessNotification,
};
