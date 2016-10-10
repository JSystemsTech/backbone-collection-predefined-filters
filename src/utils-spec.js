'use strict';
var Utils = require('./utils'),
	_ = require('underscore'),
	Backbone = require('backbone'),
	expect = require('must'),
	model = new Backbone.Model({
		number: 10,
		flag: true,
		text: 'test',
		list: [1, 2, 3, 4, 5],
		options: {
			number: 10,
			flag: true,
			text: 'test',
			list: [1, 2, 3, 4, 5],
			options: {
				number: 10,
				flag: true,
				text: 'test',
				list: [1, 2, 3, 4, 5],
				options: {
					number: 10,
					flag: true,
					text: 'test',
					list: [1, 2, 3, 4, 5],
					options: 'N/A'
				}
			}
		}
	});
describe('### Testing Utils ###', function() {
	describe('# Testing Utils.getNestedModelAttribute', function() {
		it('Returns expected value at Utils.getNestedModelAttribute(model, \'number\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'number')).to.equal(10);
		});
		it('Returns expected value at Utils.getNestedModelAttribute(model, \'flag\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'flag')).to.equal(true);
		});
		it('Returns expected value at Utils.getNestedModelAttribute(model, \'text\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'text')).to.equal('test');
		});
		describe('* Returns expected value at Utils.getNestedModelAttribute(model, \'list\')', function() {
			var expected = [1, 2, 3, 4, 5];
			var actual = Utils.getNestedModelAttribute(model, 'list');
			it('Returns an Array', function() {
				expect(_.isArray(actual)).to.equal(true);
			});
			_.each(actual, function(value, index) {
				it('Returns expected value in Array at index ' + index, function() {
					expect(value).to.equal(expected[index]);
				});
			});
		});
		it('Returns undefined at Utils.getNestedModelAttribute(model, \'invalid\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'invalid')).to.equal(undefined);
		});

		it('Returns expected value at Utils.getNestedModelAttribute(model, \'options.number\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'options.number')).to.equal(10);
		});
		it('Returns expected value at Utils.getNestedModelAttribute(model, \'options.flag\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'options.flag')).to.equal(true);
		});
		it('Returns expected value at Utils.getNestedModelAttribute(model, \'options.text\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'options.text')).to.equal('test');
		});
		describe('* Returns expected value at Utils.getNestedModelAttribute(model, \'options.list\')', function() {
			var expected = [1, 2, 3, 4, 5];
			var actual = Utils.getNestedModelAttribute(model, 'options.list');
			it('Returns an Array', function() {
				expect(_.isArray(actual)).to.equal(true);
			});
			_.each(actual, function(value, index) {
				it('Returns expected value in Array at index ' + index, function() {
					expect(value).to.equal(expected[index]);
				});
			});
		});
		it('Returns undefined at Utils.getNestedModelAttribute(model, \'options.invalid\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'options.invalid')).to.equal(undefined);
		});

		it('Returns expected value at Utils.getNestedModelAttribute(model, \'options.options.number\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'options.options.number')).to.equal(10);
		});
		it('Returns expected value at Utils.getNestedModelAttribute(model, \'options.options.flag\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'options.options.flag')).to.equal(true);
		});
		it('Returns expected value at Utils.getNestedModelAttribute(model, \'options.options.text\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'options.options.text')).to.equal('test');
		});
		describe('* Returns expected value at Utils.getNestedModelAttribute(model, \'options.options.list\')', function() {
			var expected = [1, 2, 3, 4, 5];
			var actual = Utils.getNestedModelAttribute(model, 'options.options.list');
			it('Returns an Array', function() {
				expect(_.isArray(actual)).to.equal(true);
			});
			_.each(actual, function(value, index) {
				it('Returns expected value in Array at index ' + index, function() {
					expect(value).to.equal(expected[index]);
				});
			});
		});
		it('Returns undefined at Utils.getNestedModelAttribute(model, \'options.options.invalid\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'options.options.invalid')).to.equal(undefined);
		});

		it('Returns expected value at Utils.getNestedModelAttribute(model, \'options.options.options.number\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'options.options.options.number')).to.equal(10);
		});
		it('Returns expected value at Utils.getNestedModelAttribute(model, \'options.options.options.flag\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'options.options.options.flag')).to.equal(true);
		});
		it('Returns expected value at Utils.getNestedModelAttribute(model, \'options.options.options.text\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'options.options.options.text')).to.equal('test');
		});
		describe('* Returns expected value at Utils.getNestedModelAttribute(model, \'options.options.options.list\')', function() {
			var expected = [1, 2, 3, 4, 5];
			var actual = Utils.getNestedModelAttribute(model, 'options.options.options.list');
			it('Returns an Array', function() {
				expect(_.isArray(actual)).to.equal(true);
			});
			_.each(actual, function(value, index) {
				it('Returns expected value in Array at index ' + index, function() {
					expect(value).to.equal(expected[index]);
				});
			});
		});
		it('Returns undefined at Utils.getNestedModelAttribute(model, \'options.options.options.invalid\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'options.options.options.invalid')).to.equal(undefined);
		});
		it('Returns expected value at Utils.getNestedModelAttribute(model, \'options.options.options.options\')', function() {
			expect(Utils.getNestedModelAttribute(model, 'options.options.options.options')).to.equal('N/A');
		});
	});
});