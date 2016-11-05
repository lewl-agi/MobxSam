import {State} from "./State";
import {COUNTER_MAX} from "./consts";
/**
 * Created by lewl on 11/5/2016.
 */

// Single state tree of the Application State
export class Model {
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

