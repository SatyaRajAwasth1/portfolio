import Alert from './Alert.astro';
import Callout from './Callout.astro';
import CodeBlock from './CodeBlock.astro';
import Figure from './Figure.astro';
import Note from './Note.astro';
import Quote from './Quote.astro';
import References from './References.astro';
import Sidenote from './Sidenote.astro';

// Components available inside every .mdx post without importing them.
export const components = {
  Alert,
  Callout,
  CodeBlock,
  Figure,
  Note,
  Quote,
  References,
  Sidenote,
};
