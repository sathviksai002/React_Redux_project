const Hello = (props) =>{
    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old
            </p>
        </div>
    )
}

const Check =() =>{
    const name= "sathvik"
    const age= 18
    return (
        <div>
        <h1>Greeting from KL unviersity</h1>
        <Hello name="Sai" age={10+19} />
        <Hello name= {name} age= {age} />
        </div>
    )
}

export default Check;