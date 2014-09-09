module.exports = function (request) {

	function build(callback) {

		var model = {
			goals: {
				today: {
					incomplete: [{
						text: "Build a rocket ship",
						color: "green"
					}, {
						text: "Something else",
						color: "green"
					}],
					complete: [{
						text: "Discover the moon",
						color: "green"
					}]
				}
			}
		};

		callback(model);
	}

	return {
		build: build
	};
};