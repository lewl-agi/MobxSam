import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {SAMFactory} from "./SamFactory";
import {RocketLauncherView} from "./RocketLauncherView";
import {Actions} from "./Actions";
import {Model} from "./Model";
import {State} from "./State";
import {Bmi} from "./bmi/Bmi";

// Instantiating the SAM pattern
const {state} = SAMFactory.instance(Actions, Model, State);

ReactDOM.render(
    <div>
    <RocketLauncherView stateRepresentation={state}/>
        <Bmi stateRepresentation={state}></Bmi>
    </div>, document.getElementById('root'));
