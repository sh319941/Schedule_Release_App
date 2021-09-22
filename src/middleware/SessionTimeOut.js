import React, { useEffect, useState, useRef } from 'react';
import Modal from '../component/common/modals';
import { logout } from '../component/common/Utilities/Logout';
import { refreshToken } from '../component/pingConfiguration/AccessToken';
import { getToken, getTokenExpiresIn, getDiffMinutes, getTokenExpireBefore90minutesIn } from '../utils';
import constants from '../constants';

const SessionTimeOut = () => {
  const [tokenStatus, setTokenStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const token = getToken();
  const valueRef = useRef();

  function forceLogout() {
    setOpen(false);
    logout();
  }

  function handleRefreshTokenTime() {
    const { minutesCount } = constants.tokenRefresh;
    const refreshTokenTime = localStorage.getItem('refreshTokenMinutes');
    const refreshTokenTimeParse = parseInt(refreshTokenTime) || 0;
    const refreshTokenTimeCount = refreshTokenTimeParse - 6000;
    localStorage.setItem('refreshTokenMinutes', refreshTokenTimeCount);
    if (refreshTokenTimeCount <= 0 || minutesCount < refreshTokenTimeParse) {
      refreshToken();
      localStorage.setItem('refreshTokenMinutes', minutesCount);
    }
  }

  function handleReducedTokenTime() {
    const tokenExpDateBeforeSec = getTokenExpireBefore90minutesIn();
    if (tokenExpDateBeforeSec < new Date()) {
      refreshToken();
    }
  }

  useEffect(() => {
    setTokenStatus(tokenStatus);

    const { tokenExpDateBeforeSec, tokenExpDateAfterSec } = getTokenExpiresIn();
    const minutes = getDiffMinutes();

    const { idleTimeMinutes, timeInterval, timeout } = constants.sessionTimeout;

    let timeoutClear;
    let idleTime = 0;
    let idleTimePopUp = 0;
    document.addEventListener('mousemove', (e) => {
      idleTime = 0;
    });

    document.addEventListener('keypress', (e) => {
      idleTime = 0;
    });

    const interval = setInterval(() => {
      idleTime += 1;

      if (idleTime >= idleTimeMinutes) {
        // 30 minutes
        setOpen(true);
        idleTimePopUp = idleTimeMinutes;
      }

      if (idleTimePopUp === idleTimeMinutes) {
        idleTimePopUp = 0;
        timeoutClear = setTimeout(forceLogout, timeout * 60000);
        valueRef.current = timeoutClear;
      }

      if (tokenExpDateBeforeSec > new Date() && minutes < 6 && minutes > 1) {
        refreshToken();
      }

      // optional
      if (tokenExpDateAfterSec < new Date()) {
        // logout(); if any
      }
    }, timeInterval);

    // refresh token for every 30 miniutes
    // setInterval(handleRefreshTokenTime, 6000);
    setInterval(handleReducedTokenTime, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [token]);

  const handleClose = () => {
    setOpen(false);
    logout();
  };

  const handleRefreshToken = () => {
    setOpen(false);
    refreshToken();
    clearTimeout(valueRef.current);
  };

  return <Modal open={open} handleClose={handleClose} handleRefreshToken={handleRefreshToken} />;
};

export default SessionTimeOut;
