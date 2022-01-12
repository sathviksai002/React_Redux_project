const Hello = (props) =>{
return (
    <div>
        <p>Hello {props.name}</p>
        </div>
)
}

const Fun1 =(props) =>
{
    return (
        <div>
            <p>I am from {props.name1}</p>
        </div>
    )
}


const calling =() => {
    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="sathvik"/>
            <Hello name="sai"/>
            <Fun1 name1="CSE"/>
        </div>
    )
}

export default calling;