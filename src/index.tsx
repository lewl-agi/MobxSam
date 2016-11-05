import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {SAMFactory} from "./SamFactory";
import {RocketLauncherView} from "./RocketLauncherView";

// Instantiating the SAM pattern
const {state} = SAMFactory.instance();

ReactDOM.render(<RocketLauncherView stateRepresentation={state}/>, document.getElementById('root'));
