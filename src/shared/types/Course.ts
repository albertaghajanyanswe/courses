/*
  * ideally this can be retrieved from the server using openapi
*/
export interface CourseData {
  data: Course[];
}
export interface Course {
  name: string;
  id: string;
  image: string;
  bgColor: string;
  tags: string[];
}