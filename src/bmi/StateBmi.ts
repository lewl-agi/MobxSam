/**
 * Created by lewl on 11/6/2016.
 */
/**
 * Created by lewl on 11/5/2016.
 */
import {observable, computed} from 'mobx';
import {ActionsBmi} from "./ActionsBmi";

// Compute the State Representation.
// Note, actions are  passed in via the ctor. See the Sam Factory.
export class StateBmi {
    @observable height = 0;
    @observable weight = 0;

    public actions: ActionsBmi

    constructor(a: ActionsBmi) {
        this.actions = a;
    }

    representation(model) {
        console.log("Model", model);
        this.height = model.height;
        this.weight = model.weight;
        }

    // Derive the current state of the system
    @computed get bmi() {
        return (this.height * this.weight);
    }



// Next action predicate, derives whether
// the system is in a (control) state where
// an action needs to be invoked

    nextAction() {
    }

    // After the model accepts changes proposed by the action this function is called by the model.
    // The model has an instance of the state.
    stateRender(model) {
        this.representation(model)
        this.nextAction();
    }
}
