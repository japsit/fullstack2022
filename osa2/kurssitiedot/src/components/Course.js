const Header = ({ course }) => <h1>{course.name}</h1>;

const Total = ({ parts }) => (
  <p>
    <b>Total of {parts.map(part => part.exercises).reduce((a, b) => a + b, 0)} exercises</b>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  parts.map(part => <Part key={part.id} part={part} />)
);

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;