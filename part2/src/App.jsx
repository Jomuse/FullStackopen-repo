const Header = ({ header}) => {
  console.log(header)
  return(
    <h1>
      {header}
    </h1>
  )
}
const Content = ({name, exercises}) => {
  console.log(name)
  console.log(exercises)
  return (
    <p>{name} {exercises}</p>
  )
}
const Course = ({course}) => {
  console.log('course kohta', course.parts.name, course.parts.exercises)
  return(
  <div>
  <Header header={course.name} />
  <Content name = {course.parts.name} exercises={course.parts.exercises}/>
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
      <Course course={course} />
    </div>
  )
}

export default App