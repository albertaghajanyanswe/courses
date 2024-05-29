import React, { memo, useCallback } from 'react';
import Button from '../Button';

interface FilterProps {
  filterList: string[];
  activeFilter: string;
  handleFilterClick: (clickedFilter: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  filterList,
  activeFilter,
  handleFilterClick,
}) => {
  const onClickHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.target as HTMLButtonElement;
      handleFilterClick(target.innerText);
    },
    [handleFilterClick]
  );

  return (
    <div className='filter-container'>
      {filterList.map((filterItem: string) => {
        return (
          <Button
            key={filterItem}
            label={filterItem}
            onClick={onClickHandler}
            className={activeFilter === filterItem ? `btn-active` : ''}
          />
        );
      })}
    </div>
  );
};

export default memo(Filter);
