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
    const Course =({course}) => {
    return(
    <div>
    <Header header={course.name} />
    <Content kurssit={course.parts}/>
    <Total parts={course.parts}/>
  </div>
    )
}



export default Course