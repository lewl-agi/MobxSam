/**
 * Created by lewl on 11/5/2016.
 */

export class SAMFactory {

    static  instance(actionCtor, modelCtor, stateCtor): any {
        // wire SAM's reactive loop
        // A) Start with Actions..
        //const actions = new Actions();
        const actions = new actionCtor();

        // B) State has a set of actions.
        const state = new stateCtor(actions);

        // C) Model has state
        const model = new modelCtor(state);

        // D) Give actions a function to present data to the model.
        // A function that returns a function which accepts data and passes it to the model's present function.
        let present = model => {
            return  (data: any) => {
                model.present(data);
            }
        }

        actions.setPresent(present(model));

        return {state, actions, model};
    }
}
