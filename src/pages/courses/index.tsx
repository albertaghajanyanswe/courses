import React, { useCallback, useMemo, useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Course, CourseData } from '../../shared/types/Course';
import { queryKeys } from '../../shared/services/configs';
import { CONSTANTS } from '../../shared/constats';
import coursesService from '../../shared/services/coursesService';
import Card from '../../components/Card';
import Filter from '../../components/Filter';

function Courses() {
  // Save active filter
  const [activeFilter, setActiveFilter] = useState(CONSTANTS.defaultFilter);

  // Change filter
  const handleFilterClick = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  // fetching courses
  const queryResult: UseQueryResult<CourseData, Error> = useQuery({
    queryKey: queryKeys.getCourses,
    queryFn: coursesService.getCourses,
  });

  const { data, error, isLoading } = queryResult;

  // Collect unique tags
  const uniqueTagsSet = useMemo(() => {
    return (
      data &&
      data.data &&
      data.data.reduce((acc: Set<string>, course: Course) => {
        course.tags.forEach((tag) => acc.add(tag));
        return acc;
      }, new Set<string>())
    );
  }, [data]);

  // Convert the Set to an array
  const uniqueTagsArray: string[] = useMemo(() => {
    return uniqueTagsSet
      ? [CONSTANTS.defaultFilter, ...(Array.from(uniqueTagsSet) as string[])]
      : [CONSTANTS.defaultFilter];
  }, [uniqueTagsSet]);

  // Filter courses based on activeFilter
  const filteredCoursesList = useMemo(() => {
    if (activeFilter && activeFilter !== CONSTANTS.defaultFilter) {
      return data?.data?.filter((item: Course) =>
        item.tags.includes(activeFilter)
      );
    }
    return data?.data;
  }, [data, activeFilter]);

  const coursesView = useMemo(() => {
    return filteredCoursesList?.map((course: Course) => (
      <Card key={course.id} data={course} />
    ));
  }, [filteredCoursesList]);

  if (isLoading) return <h1 className='loading'>Loading...</h1>;
  if (error)
    return <div className='error-container'>Error: {error.message}</div>;

  return (
    <div className='courses-container'>
      <Filter
        filterList={uniqueTagsArray}
        activeFilter={activeFilter}
        handleFilterClick={handleFilterClick}
      />
      <div className='card-container'>{coursesView}</div>
    </div>
  );
}

export default Courses;
