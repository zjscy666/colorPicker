## Options

| Name               | Type              | Default                                                                                                                                                                                  | Description                             |
| ------------------ | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| theme              | String            | `dark`                                                                                                                                                                                   | `dark` or `light`                       |
| color              | String            | `#000000`                                                                                                                                                                                | `rgba` or `hex`                         |
| width              | Number            | `310`                                                                                                                                                                                    | `number`                                 |
| colors-default     | Array             | `['#B71C1C', '#E65100', '#F57F17', '#1B5E20', '#006064', '#0D47A1', '#1A237E', '#4A148C', '#880E4F', '#D32F2F']` | like `['#ff00ff', 'rgba(0,0,0,0)', ...]`                              |
| colors-history-key | String            | `vue-colorpicker-history`                                                                                                                                                                |
| colors-self-history-key | String            | `vue-colorpicker-history-self`                                                                                                                                                                |

## Events

| Name        | Type     | Args   | Description                     |
| ----------- | -------- | ------ | ------------------------------- |
| changeColor | Function | color  | `{ rgba: {}, hsv: {}, hex: ''}` |