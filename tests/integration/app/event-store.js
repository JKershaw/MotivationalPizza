/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie');

var MpApp = require("../../../lib/app/MpApp"),
	TasksRepository = require('../../../lib/repositories/TasksRepository'),
	UsersRepository = require('../../../lib/repositories/UsersRepository');

var mpApp = new MpApp(new TasksRepository(), new UsersRepository());

var task = {
	text: "Oooh"
};

describe('Given I add a task', function (done) {

	before(function (done) {
		mpApp.command.add(task, function () {
			done();
		});
	});

	it('The most recent event is for this task', function (done) {
		mpApp.query.latestEvent(function (event) {
			expect(event.type).to.equal("TaskAdd");
			expect(event.data.task.text).to.equal(task.text);
			done();
		});
	});

	describe('Given I bump a task', function (done) {

		before(function (done) {
			mpApp.command.bump(task, function () {
				done();
			});
		});

		it('The most recent event is for this task', function (done) {
			mpApp.query.latestEvent(function (event) {
				expect(event.type).to.equal("bumpTask");
				expect(event.data.task.text).to.equal(task.text);
				done();
			});
		});
	});
});