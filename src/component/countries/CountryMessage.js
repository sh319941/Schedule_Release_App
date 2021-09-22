import React from 'react';

export const deactiveMsg = () => (
  <div className="login-user-type">
    <p>Are you sure you want to deactivate this Country?</p>
    <p>The Country and all its users will be deactivated.</p>
  </div>
);
export const activeMsg = 'Are you sure you want to activate this Country ?';
export const updatMsg = 'Are you sure you want to make changes to this Country ?';
export const deactivate = deactiveMsg();
export const msgData = { activate: activeMsg, deactivate, update: updatMsg, title: 'Countries' };
