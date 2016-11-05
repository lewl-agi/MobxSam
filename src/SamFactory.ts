import {Model} from "./Model";
import {Actions} from "./Actions";
import {State} from "./State";
/**
 * Created by lewl on 11/5/2016.
 */

export class SAMFactory {

    static  instance(): any {
        // wire SAM's reactive loop
        // A) Start with Actions..
        const actions = new Actions();

        // B) State has a set of actions.
        const state = new State(actions);

        // C) Model has state
        const model = new Model(state);

        // D) Give actions a function to present data to the model.
        // A function that returns a function which accepts data and passes it to the model's present function.
        function present(model: Model) {
            let _model = model;
            return function (data: any) {
                _model.present(data);
            }
        }
        actions.setPresent(present(model));

        return {state, actions, model};
    }
}
