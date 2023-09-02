export default {
  isModifier,

  H: 72,
  L: 76,
  Space: 32,
  '/': 191,
  P: 80,
  Minus:189,
  Plus:187
};

function isModifier(e) {
  return e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
}
