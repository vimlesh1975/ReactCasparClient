// import { Config } from "@remotion/cli/config";
//
// Config.overrideWebpackConfig((currentConfiguration) => {
//   return {
//     ...currentConfiguration,
//     module: {
//       ...currentConfiguration.module,
//       rules: [
//         ...(currentConfiguration.module?.rules ?? []),
//         // Add more loaders here
//       ],
//     },
//   };
// });

import { Config } from '@remotion/cli/config';

Config.overrideWebpackConfig((currentConfiguration) => {
  return {
    ...currentConfiguration,
    resolve: {
      ...currentConfiguration.resolve,
      alias: {
        ...currentConfiguration.resolve?.alias,
        fs: 'css/lib/stringify', // Change this path to your desired alias
      },
    },
    module: {
      ...currentConfiguration.module,
      rules: [
        ...(currentConfiguration.module?.rules ?? []),
        // Add more loaders here
      ],
    },
  };
});
