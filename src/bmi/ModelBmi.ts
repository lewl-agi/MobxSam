import {StateBmi} from "./StateBmi";


// Single state tree of the Application State
export class ModelBmi {
    private model: any;

    constructor(private state: StateBmi) {
        this.model = {

            height: 72,
            weight: 170
        }

        this.state.stateRender(this.model);
    }

    // This function is called by actions. See SamFactory for wiring.
    present(data) {
       if (data.weight){
           this.model.weight = data.weight;
       }
       if (data.height){
           this.model.height = data.height;
       }
        this.state.stateRender(this.model);
    }
}


