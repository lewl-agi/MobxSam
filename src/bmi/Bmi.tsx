/**
 * Created by lewl on 11/5/2016.
 */

import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import {StateBmi} from "./StateBmi";

@observer
export class Bmi extends React.Component<{stateRepresentation: StateBmi}, {}> {
    render() {
        return (
            <div>
                <label>Weight</label><input type="range" min='100' max='275' onChange={this.onWeightChangeHandler.bind(this)}/>
                <label>Height</label><input type="range" min='60' max='84' onChange={this.onHeightChangeHandler.bind(this)}/>
                <h2>BMI: {this.props.stateRepresentation.bmi}</h2>
            </div>
        )
    }

    onHeightChangeHandler(evt) {
        evt.preventDefault();
        this.props.stateRepresentation.actions.weightOrHeightChange({height:evt.target.value});
    }

    onWeightChangeHandler(evt) {
        evt.preventDefault();
        this.props.stateRepresentation.actions.weightOrHeightChange({weight:evt.target.value});
    }
}
