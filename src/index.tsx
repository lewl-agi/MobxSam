import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable, computed} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

const COUNTER_MAX = 10;

// Actions are pure functions that respond to 'intents' from the the user or elsewhere. Here, Actions are
// invoked by the React Components. For example see (this.props.stateRepresentation.actions.start({});)
// Actions then action.present(data) to the model via the function passed in via setPresent(p).
// See the SamFactory for that wiring.
class Actions {

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

// Compute the State Representation.
// Note, actions are  passed in via the ctor. See the Sam Factory.
class State {
    @observable _counter = COUNTER_MAX;
    @observable _aborted = false;
    @observable _started = false;
    @observable _launched = false;

    public actions: Actions

    constructor(a: Actions) {
        this.actions = a;
    }

    getActions() {
        return actions;
    }

    representation(model) {
        console.log("Model", model);
        this._counter = model.counter;
        this._started = model.started;
        this._aborted = model.aborted;
        this._launched = model.launched;

    }

    // Derive the current state of the system
    @computed get ready() {
        return ((this._counter === COUNTER_MAX) && !this._started && !this._launched && !this._aborted);
    }

    @computed get counting() {
        return ((this._counter <= COUNTER_MAX) && (this._counter >= 0) && this._started && !this._launched && !this._aborted);
    }

    @computed get launched() {
        return ((this._counter == 0) && this._started && this._launched && !this._aborted);
    }

    @computed get aborted() {
        return ( ( this._counter <= COUNTER_MAX) && (this._counter >= 0)
        && this._started && !this._launched && this._aborted );
    }


// Next action predicate, derives whether
// the system is in a (control) state where
// an action needs to be invoked

    nextAction() {
        if (this.counting) {
            if (this._counter > 0) {
                actions.decrement({counter: this._counter});
            }

            if (this._counter === 0) {
                actions.launch({});
            }
        }

    }

    // After the model accepts changes proposed by the action this function is called by the model.
    // The model has an instance of the state.
    stateRender(model) {
        this.representation(model)
        this.nextAction();
    }
}

// Single state tree of the Application State
class Model {

    private model: any;

    constructor(private state: State) {
        this.model = {
            counter: COUNTER_MAX,
            started: false,
            launched: false,
            aborted: false
        }

        this.state.stateRender(this.model);
    }

    // This function is called by actions. See SamFactory for wiring.
    present(data) {
        if (data.restart) {
            this.model.counter = COUNTER_MAX;
            this.model.launched = false;
            this.model.aborted = false;
            this.model.started = false;
        } else if (this.state.counting) {
            if (this.model.counter === 0) {
                this.model.launched = data.launched || false;
            } else {
                this.model.aborted = data.aborted || false;
                if (data.counter !== undefined) {
                    this.model.counter = data.counter;
                }
            }
        } else {
            if (this.state.ready) {
                this.model.started = data.started || false;
            }
        }
        this.state.stateRender(this.model);
    }
}

@observer
class RocketLauncherView extends React.Component<{stateRepresentation: State}, {}> {
    render() {
        console.log(this.props.stateRepresentation);
        if (this.props.stateRepresentation.counting) {
            return (
                <div>
                    <p>Count down:{this.props.stateRepresentation._counter}</p>
                    <button onClick={this.abort}>
                        Abort
                    </button>
                    <button onClick={this.restart}>
                        Restart
                    </button>

                    <DevTools />
                </div>
            );
        }
        if (this.props.stateRepresentation.aborted) {
            return (
                <div>
                    <p>Aborted at: {this.props.stateRepresentation._counter} s</p>
                    <button onClick={this.restart}>
                        Restart
                    </button>
                    <DevTools />
                </div>
            );
        }
        if (this.props.stateRepresentation.launched) {
            return (
                <div>
                    <p>Launched</p>
                    <DevTools />
                    <button onClick={this.restart}>
                        Restart
                    </button>
                </div>
            );
        }
        return (
            <div>
                <p>Count down:{this.props.stateRepresentation._counter}</p>
                <button onClick={this.start}>
                    Start
                </button>
                <DevTools />
            </div>
        );
    }

    start = (event) => {
        event.preventDefault();
        console.log(event);
        this.props.stateRepresentation.actions.start({});
    }

    abort = (event) => {
        event.preventDefault();
        console.log(event);
        this.props.stateRepresentation.actions.abort({});
    }

    // Invoke the sr's restart action:
    restart = (event) => {
        event.preventDefault();
        console.log(event);
        this.props.stateRepresentation.actions.restart({});
    }
}
;

class SAMFactory {

    static  instance(): any {

        // A function that returns a function which accepts data and passes it to the model's present function.
        function present(model: Model) {
            let _model = model;
            return function (data: any) {
                _model.present(data);
            }
        }

        // wire SAM's reactive loop
        // A) Start with Actions..
        const actions = new Actions();

        // B) State has a set of actions.
        const state = new State(actions);

        // C) Model has state
        const model = new Model(state);

        // D) Give actions a function to present data to the model.
        actions.setPresent(present(model));

        return {state, actions, model};
    }

}


// Instantiating the SAM pattern
const {state, actions, model} = SAMFactory.instance();

ReactDOM.render(<RocketLauncherView stateRepresentation={state}/>, document.getElementById('root'));
