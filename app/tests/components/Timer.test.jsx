var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Timer = require('Timer');

describe('Timer', () => {
    it('should exist', ()=> {
        expect(Timer).toExist();
    })

    describe('handleStatusChange', () => {
        it('should set state to started and start counting up', (done) => {
            var timer = TestUtils.renderIntoDocument(<Timer/>);
           timer.handleStatusChange('started');
            
            expect(timer.state.count).toBe(0);
            expect(timer.state.countdownStatus).toBe('started');

            setTimeout(() => {
                expect(timer.state.count).toBe(1);
                done();
            }, 1001);
        });

        it('should pause countdown on paused status', (done) => {
            var timer = TestUtils.renderIntoDocument(<Timer/>);
            timer.handleStatusChange('started');
            timer.handleStatusChange('paused');

            setTimeout(() => {
                expect(timer.state.count).toBe(0);
                expect(timer.state.countdownStatus).toBe('paused');
                done();
            }, 1001);
        });

        it('should reset countdown and pause it on clear press', (done) => {
            var timer = TestUtils.renderIntoDocument(<Timer/>);
            timer.handleStatusChange('started');

            setTimeout(() => {
                timer.handleStatusChange('stopped');
                expect(timer.state.count).toBe(0);
                expect(timer.state.countdownStatus).toBe('stopped');
                done();
            }, 1001);
        });
    });
});