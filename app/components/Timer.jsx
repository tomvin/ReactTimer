var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({
    getInitialState: function () {
        return {
            count: 0,
            countdownStatus: 'stopped'
        };
    },
    handleStatusChange: function(newStatus) {
        this.setState({countdownStatus: newStatus});
    },
     componentDidUpdate: function (previousProps, previousState) {
        if(this.state.countdownStatus != previousState.countdownStatus) {
            switch(this.state.countdownStatus) {
                case 'started': 
                    this.startTimer();
                    break;
                case 'stopped':
                    this.setState({count: 0});
                case 'paused':
                    clearInterval(this.timer);
                    this.timer = undefined;
                    break;
            }
        }
    },
    startTimer: function () {
        this.timer = setInterval(() => {
            var newCount = this.state.count + 1;
        }, 1000);
    },
    componentWillUnmount: function () {
        clearInterval(this.timer);
        this.timer = undefined;
    },
    render: function () {
        var {count, countdownStatus} = this.state;

        return (
            <div>
                <h1 className="page-title">Timer</h1>
                <Clock totalSeconds={count} countdownStatus={countdownStatus}/>
                <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
            </div>
        );
    }
});

module.exports = Timer;