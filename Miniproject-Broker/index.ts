//const name2: string = 'Bob'
//compile-time guarantee
const sayHello = (name: 'Bob' | 'Alice') => `Say ${name}`
sayHello('Alice')

const addInt = (a: number, b: number) => a + b;
addInt(50, 40)

const flip = (n: boolean) => !n
flip(true)

// function 
function add() {
    //syntax function
}

const add2 = (a: number, b: number): number => {
    // error function
    return a + b // return type
}

//array
const bd: number[] = [20, 1, 2000]
const grid = [[1, 2], [3, 'hello']]
const test: (5 | true)[][] = []
// tuple
function useState(): [number, () => void] {
    return [1024, () => { }]
}
const [counter, setCounter] = useState()

function useEffect(arg1: () => () => void, arg2: []) {

}
useEffect(() => {
    return () => { }
}, [])
//type
//any
//disable complier checks for that variable
function add1(a: unknown, b: any) {
    //a.toExponential()
    if (typeof a === 'number') {
        a
    }
}

//unknown = i'm not yet sure what this type is
add1(10, 20)
//type inference -> กว้างที่สุด 

//type strict
//undefined is not a function 
const shouldBeNull = null
const shouldBeUndefined = undefined

function getUser(): string | null {
    return 'Hello'
}
const userName = getUser()

//Object ซ้อน
const person = {
    name: {
        title: {
            age: null
        }
    }
}
const person2: { name: string } = { name: '2000' }


interface BaseProps {
    role: string
}

type Person = {
    name: string
} & BaseProps

const person3: Person = {
    name: 'Alice',
    role: 'hello'
}
//type StringAndNumber = string & number
type StringAndNumber = string | number

//Optionals
function fecthUser(username: string, context?: unknown) { } // add '?' before :
fecthUser('hello')

//type casting : as and as unknown
function loadTwitterFeed(hello: unknown) {
    if (typeof hello === 'string') {
        hello.toLowerCase()
    }
    // const hello2 = hello as number
    // hello2.toFixed()
}
loadTwitterFeed(2000)

//enum vs enums  
enum Version {
    v1 = 'v1',
    v2 = 200
}

function setBackend(version: 'v1' | 'v2') {

}
setBackend(Version.v1)

