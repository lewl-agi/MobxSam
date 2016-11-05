/**
 * Created by lewl on 11/5/2016.
 */

import {State} from "./State";
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';

 @observer export
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

