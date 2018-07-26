import React from "react"
import { observer } from 'mobx-react';


const Square = observer(
    props => <li className="item">
        {props.id}
    </li>
);


export default Square;
