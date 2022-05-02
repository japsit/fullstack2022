const Header = ({course}) => <h1>{course.name}</h1>
const Content = ({course}) => course.parts.map(elem => <Part part={elem} />)
const Part = ({part}) => (<p>{part.name} {part.exercises} </p>)

const Total = (props) => {
  let summa = 0;
  props.course.parts.forEach(element => {
    summa += element.exercises;
  });
  
  return (<p>Number of exercises {summa}</p>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App