const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ parts }) => <p>Total of {parts.map(part => part.exercises).reduce((a, b) => a + b, 0)} exercises</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => (parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>))


const Course = ({course}) => (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
)

export default Course
/*<Total sum={parts[0].exercises + parts[1].exercises + parts[2].exercises} />*/
