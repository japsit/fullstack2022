const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => {

  let parts = props.parts.map(elem => <Part part={elem} />)
  return (parts);
}

const Part = (props) => {
  return (<p>{props.part.name} {props.part.exercises} </p>)
}

const Total = (props) => {
  let summa = 0;
  props.sum.forEach(element => {
    summa += element.exercises;
  });
  
  return (<p>Number of exercises {summa}</p>)
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total sum={parts} />
    </div>
  )
}

export default App