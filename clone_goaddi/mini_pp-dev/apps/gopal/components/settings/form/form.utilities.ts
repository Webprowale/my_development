export function replaceWith(text: string, target = " ", seperator = "_") {
  return text.toLowerCase().replace(target, seperator);
}
