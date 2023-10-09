import { Component } from 'solid-js';

export const DataLoader: Component = () => {
  return (
    <div class='lds-ring'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export const CenteredDataLoader: Component = () => {
  return (
    <div class='flex-it justify-center items-center'>
      <DataLoader />
    </div>
  );
};
