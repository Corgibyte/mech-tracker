import React from 'react';

export default function Spinner() {
  return (
    <div className='w-5 h-5 my-1 mr-1'>
      <div className='w-5 h-5 rounded-full animate-spin absolute border-2 border-dashed border-black border-t-transparent'></div>
    </div>
  );
}
