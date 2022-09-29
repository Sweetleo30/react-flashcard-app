// import { useState } from 'react';

// export function Counter() {

//     const [count, setCount] = useState(0);
//     const handleClick = () => {
//         setCount(count + 1);
//     }

//     return (
//         <button onClick={handleClick}>{count}</button>
//     )
// }


// import React from "react";
// class Counter extends React.Component {
//     state = {
//         count: 0
//     };
//     handleClick = () => {
//         this.setState(({ count }) => ({
//             count: count + 1
//         }));
//     };
//     render() {
//         return <button onClick={this.handleClick}>{this.state.count}</button>;
//     }
// }

// export default Counter;


import React from "react";
class Counter extends React.Component {
    render() {

        let { id, title, } = this.props
        title += description;
        return (
            <span>{title}</span>
        );
    }
}

export default Counter;
