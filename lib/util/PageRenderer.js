
module.exports = function (request, response) {
	
	function render(view, model) {

		if (!model) {
			model = {};
		}

		model.user = request.user || false;
		model.environment = process.env.ENVIRONMENT || "live";
		
		response.render(view, model);
	}

	return {
		render: render
	};
};
