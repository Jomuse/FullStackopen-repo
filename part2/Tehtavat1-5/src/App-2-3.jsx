/* eslint-disable react/prop-types */
const Header = ({ header}) => {
  console.log(header)
  return(
    <div>
    <h1>
      {header}
    </h1>
    </div>
  )
}
const Part = (props) => {
  return (
    <div>
    <p>{props.course.name} {props.course.exercises}</p>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
    {props.kurssit.map((k) => <Part key={k.id} course={k}/>)}
    </div>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((accumalator, nykyinen) => 
  accumalator + nykyinen.exercises, 0)
  return (
    <div>
      <p>Total of {total} exercises</p>
    </div>
  )
}
  
const Course = ({course}) => {
  return(
  <div>
  <Header header={course.name} />
  <Content kurssit={course.parts}/>
  <Total parts={course.parts}/>
  </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App