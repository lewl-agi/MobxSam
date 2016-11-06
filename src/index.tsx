import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {SAMFactory} from "./SamFactory";
import {RocketLauncherView} from "./RocketLauncherView";
import {Actions} from "./Actions";
import {Model} from "./Model";
import {State} from "./State";


import {Bmi} from "./bmi/Bmi";
import {ActionsBmi} from "./bmi/ActionsBmi";
import {ModelBmi} from "./bmi/ModelBmi";
import {StateBmi} from "./bmi/StateBmi";

// Instantiating the SAM pattern
const {state:stateLauncher} = SAMFactory.instance(Actions, Model, State);

const {state:stateBmi} = SAMFactory.instance(ActionsBmi, ModelBmi, StateBmi);

ReactDOM.render(
    <div>
        <RocketLauncherView stateRepresentation={stateLauncher}/>
        <Bmi stateRepresentation={stateBmi}></Bmi>
    </div>, document.getElementById('root'));
