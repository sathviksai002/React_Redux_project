const Hello=(props)=>{
    const BornYear=()   =>{
        const yearNow=new Date().getFullYear()
        return yearNow-props.age
    }
    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old
             </p>
             <p>so you are probably born in {BornYear()}</p>
        </div>
        
    )
}
const Age= () => {
    const name= 'sathvik'
    const age=19
    return (
        <div>
            <h1>Greetings</h1>
            <Hello name= {name} age ={age} />
      </div>
    )
}

export default Age;