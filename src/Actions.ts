/**
 * Created by lewl on 11/5/2016.
 */
// Actions are pure functions that respond to 'intents' from the the user or elsewhere. Here, Actions are
// invoked by the React Components. For example see (this.props.stateRepresentation.actions.start({});)
// Actions then action.present(data) to the model via the function passed in via setPresent(p).
// See the SamFactory for that wiring.
export class Actions {

    private _present: (data: any) => void

    constructor() {

    }

    // Called via the SamFactory:
    setPresent(present: (data: any) => void) {
        this._present = present;
    }

    start(data: any, present?: (data: any) => void) {
        present = present || this._present;
        data.started = true;
        present(data);
        return false;
    }

    decrement(data: any, present?: (data: any) => void) {
        present = present || this._present;
        data = data || {};
        data.counter = data.counter || 10;
        var d = data;
        var p = present;
        setTimeout(function () {
            d.counter = d.counter - 1;
            p(d);
        }, 1000);
    }

    launch(data: any, present?: (data: any) => void) {
        present = present || this._present;
        data.launched = true;
        present(data);
    }

    abort(data: any, present?: (data: any) => void) {
        present = present || this._present;
        data.aborted = true;
        present(data);
        return false;
    }

    // set the data's restart to true. The model will then be presented that data.
    restart(data: any, present?: (data: any) => void) {
        present = present || this._present;
        data.restart = true;
        present(data);
        return false;
    }
}

