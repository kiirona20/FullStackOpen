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


const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      {
      courses.map((course)=>
        <Course key={course.id} course={course} />
      )
    }
    </div>
  )
}

export default App