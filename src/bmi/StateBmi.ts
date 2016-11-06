/**
 * Created by lewl on 11/6/2016.
 */
/**
 * Created by lewl on 11/5/2016.
 */
import {observable, computed, action} from 'mobx';
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

     @action representation(model) {
        console.log("Model", model);
        this.height = parseInt(model.height);
        this.weight = parseInt(model.weight);
    }

    // Derive the current state of the system
    @computed get bmi() {
        //  To work out your BMI:
        // divide your weight in kilograms (kg) by your height in metres (m)
        // then divide the answer by your height again to get your BMI.
        let height = this.height * 0.0254;
        let weight = this.weight * 0.453592;
        return (weight / height) / height;
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
