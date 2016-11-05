/**
 * Created by lewl on 11/5/2016.
 */
import {observable, computed} from 'mobx';
import {Actions} from "./Actions";
import {COUNTER_MAX} from "./consts";

// Compute the State Representation.
// Note, actions are  passed in via the ctor. See the Sam Factory.
export class State {
    @observable _counter = COUNTER_MAX;
    @observable _aborted = false;
    @observable _started = false;
    @observable _launched = false;

    public actions: Actions

    constructor(a: Actions) {
        this.actions = a;
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
                this.actions.decrement({counter: this._counter});
            }

            if (this._counter === 0) {
                this.actions.launch({});
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
