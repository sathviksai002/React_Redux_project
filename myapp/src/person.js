class Person
{
    constructor(name,age)
    {
        this.name=name;
        this.age=age;
    }
    greet(){
        console.log('Hello, my name is '+this.name+'\n'+'my age is ='+this.age)
    }
}

const f1=new Person('sathvik sai',19)
f1.greet()
const f2=new Person('jaideep sharma',20)
f2.greet()
const f3=new Person('Nihal agarwal',18)
f3.greet()