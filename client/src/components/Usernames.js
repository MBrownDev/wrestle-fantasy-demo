import React from "react";
import { useEffect } from "react";

const Usernames = () => {
    const names = ['Jim', 'Jack', 'John', 'Jerry']

    function myFunction(names) {
        for(let i=0; i < names.length; i++){
            if(i === 0){
                names[names.length-1] = names[i]
            }
            else{
                names[i-1] = names[i]
            }
        }
        console.log(names)
    }

    useEffect(()=> {
        setTimeout(myFunction(names), 5000)
    })
    return(
        <div>
            {
                names.map((name) => {
                    return(
                        <ul>
                            <li>{name}</li>
                        </ul>
                    )
                })
            }
        </div>
    )
}

export default Usernames;