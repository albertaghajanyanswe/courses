import React, { memo } from 'react';
import { Course } from '../../shared/types/Course';

interface FilterProps {
  data: Course;
}

const Card: React.FC<FilterProps> = ({ data }) => {
  return (
    <div className='card' style={{ backgroundColor: data.bgColor }}>
      <div className='card-img-container'>
        <img className='card-img' src={data.image} alt='Card'></img>
      </div>
      <p className='card-title'>{data.name}</p>
    </div>
  );
};

export default memo(Card);
