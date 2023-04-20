import { primaryShade } from '../primary-shade/primary-shade.js';

function primaryColor(theme) {
  return (colorScheme) => {
    const shade = primaryShade(theme)(colorScheme);
    return theme.colors[theme.primaryColor][shade];
  };
}

export { primaryColor };
//# sourceMappingURL=primary-color.js.map
