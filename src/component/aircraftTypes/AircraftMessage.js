import React from 'react';

export const DeactiveMsg = () => (
  <div className="login-user-type">
    <p>Are you sure you want to deactivate this aircraft type ?</p>
  </div>
);
export const activeMsg = 'Are you sure you want to activate this aircraft type ?';
export const updatMsg = 'Are you sure you want to make changes to this aircraft type?';
export const deactivate = DeactiveMsg();
export const msgData = {
  activate: activeMsg,
  deactivate,
  update: updatMsg,
  title: 'Aircraft Types',
};
