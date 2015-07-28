/**
 * TODO: I need something better than this. Manually changing template is
 * very inconvenient :(. Should it be defined with metadata?
 */
import npm from './npm.jsx';
import gosearch from './gosearch.jsx';
import bower from './bower.jsx';
import composer from './composer.jsx';
import rubygems from './rubygems.jsx';
import cran from './cran.jsx';
import brew from './brew.jsx';
import debian from './debian.jsx';

import github from './github.jsx';

import defaultTempalte from './default.jsx';

export default {
  npm: npm,
  gosearch: gosearch,
  bower: bower,
  composer: composer,
  rubygems: rubygems,
  github: github,
  cran: cran,
  brew: brew,
  debian: debian,
  default: defaultTempalte
}
