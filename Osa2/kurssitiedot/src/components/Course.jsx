const Course = ({course}) => {
    return(
    <div>
      <Header name={course.name} />
      <Content course={course} />
    </div>
  )
  }
  
  const Header = ({name}) => {
    return(
    <h1>{name}</h1>
    )
  }
  
  
  const Content = ({course}) => {
    return(
      <div>
          {
            course.parts.map((part)=>
            <Part key={part.id} part={part} />
            )}
          <Total parts={course.parts} />
      </div>
    )
  
  }
  
  const Part = ({part}) => {
    return(
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Total = ({parts}) => {
    return(
      <h4>total of {parts.reduce((total, part)=>{
        total += part.exercises
        return(total)  
      }, 0)} exercises</h4>
    )
  
  }
export default Course