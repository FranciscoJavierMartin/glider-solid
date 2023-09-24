import { Component } from 'solid-js';
import { FaBrandsGlideG } from 'solid-icons/fa';

type LoaderProps = {
  size: number;
};

const Loader: Component<LoaderProps> = (props) => {
  return (
    <div class='flex-it text-white justify-center items-center h-full'>
      <div class='rotating'>
        <FaBrandsGlideG size={props.size} />
      </div>
    </div>
  );
};

export default Loader;
