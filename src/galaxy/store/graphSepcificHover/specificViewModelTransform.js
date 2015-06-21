/**
 * Defines graph-sepcific hover window templates. I'm not sure about this
 * approach yet, since it doesn't scale well for future unknown cases. Need
 * to think more
 */

export default specificViewModelTransform;

function specificViewModelTransform(graphName, viewModel) {

  switch (graphName) {
    case 'npm':
    case 'bower':
    case 'cpan':
    case 'gosearch':
    case 'composer':
    case 'rubygems':
      if (viewModel.inDegree === 1) {
        viewModel.inDegreeLabel = ' dependent';
      } else {
        viewModel.inDegreeLabel = ' dependents';
      }
      if (viewModel.outDegree === 1) {
        viewModel.outDegreeLabel = ' dependency';
      } else {
        viewModel.outDegreeLabel = ' dependencies';
      }
      break;
    case 'github':
      viewModel.inDegreeLabel = ' followers';
      viewModel.outDegreeLabel = ' following';
  }

  if (graphName === 'gosearch') {
    // most of the go packages are on github, which results in huge name.
    // Lets shorted it:
    viewModel.name = viewModel.name.replace('github.com/', '');
  }

  return viewModel;
}
