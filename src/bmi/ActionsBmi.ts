/**
 * Created by lewl on 11/5/2016.
 */
// Actions are pure functions that respond to 'intents' from the the user or elsewhere. Here, Actions are
// invoked by the React Components. For example see (this.props.stateRepresentation.actions.start({});)
// Actions then action.present(data) to the model via the function passed in via setPresent(p).
// See the SamFactory for that wiring.
export class ActionsBmi {

    private _present: (data: any) => void

    constructor() {

    }

    // Called via the SamFactory:
    setPresent(present: (data: any) => void) {
        this._present = present;
    }

    // Actions
    weightOrHeightChange(data, present?: (data: any) => void) {
        present = present || this._present;
        present(data)
    }

    calcBmi(data, present?: (data: any) => void) {
        present = present || this._present;
        present(data);
    }
}


